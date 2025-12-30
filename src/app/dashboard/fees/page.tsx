"use client";
import React, { useState } from "react";
import { CreditCard, Upload, Check } from "lucide-react";
import { uploadFile } from "@/lib/storage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function FeesPage() {
    const [selectedFee, setSelectedFee] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "slip">("card");
    const [slipFile, setSlipFile] = useState<File | null>(null);
    const { user } = useAuth();
    const [uploading, setUploading] = useState(false);

    const FEES = [
        { id: "reg_sem2", title: "Semester 2 Registration", amount: 5000, deadline: "2023-12-30" },
        { id: "exam_y2s2", title: "Year 2 Sem 2 Exam Fees", amount: 2500, deadline: "2023-12-30" },
    ];

    const handlePayment = async () => {
        if (!selectedFee) return;

        if (paymentMethod === "card") {
            // Redirect to PayHere or similar
            alert("Redirecting to Payment Gateway for " + selectedFee);
        } else {
            // Handle file upload
            if (!slipFile || !user) {
                alert("Please select a bank slip image and ensure you are logged in.");
                return;
            }

            try {
                setUploading(true);
                const path = `slips/${user.uid}/${Date.now()}_${slipFile.name}`;
                const downloadUrl = await uploadFile(slipFile, path);

                // Save payment record
                await addDoc(collection(db, "payments"), {
                    userId: user.uid,
                    feeId: selectedFee,
                    amount: FEES.find(f => f.id === selectedFee)?.amount || 0,
                    method: "bank_transfer",
                    status: "pending_verification",
                    proofUrl: downloadUrl,
                    createdAt: serverTimestamp(),
                });

                alert("Slip uploaded successfully! Status: Pending Verification");
                setSlipFile(null);
            } catch (error) {
                console.error("Upload failed", error);
                alert("Upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Fees & Payments</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Fee Selection */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold mb-4">Select Payment</h2>
                    {FEES.map((fee) => (
                        <div
                            key={fee.id}
                            onClick={() => setSelectedFee(fee.id)}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${selectedFee === fee.id
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-zinc-800 hover:border-blue-300"
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{fee.title}</h3>
                                    <p className="text-sm text-gray-500">Due: {fee.deadline}</p>
                                </div>
                                <span className="font-bold text-lg">LKR {fee.amount.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Payment Method */}
                {selectedFee && (
                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 h-fit animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-lg font-semibold mb-6">Choose Payment Method</h2>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => setPaymentMethod("card")}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${paymentMethod === "card"
                                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "border-gray-200 dark:border-zinc-700 hover:bg-gray-50"
                                    }`}
                            >
                                <CreditCard size={24} />
                                <span className="font-medium text-sm">Online Pay</span>
                            </button>
                            <button
                                onClick={() => setPaymentMethod("slip")}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${paymentMethod === "slip"
                                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "border-gray-200 dark:border-zinc-700 hover:bg-gray-50"
                                    }`}
                            >
                                <Upload size={24} />
                                <span className="font-medium text-sm">Upload Slip</span>
                            </button>
                        </div>

                        {paymentMethod === "card" ? (
                            <div className="text-center p-6 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    You will be securely redirected to the payment gateway to complete your transaction via Visa/MasterCard or LankaQR.
                                </p>
                                <button onClick={handlePayment} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                                    Pay Now
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                                    <p className="font-semibold mb-1">Bank Transfer Instructions:</p>
                                    <p>Bank: Bank of Ceylon</p>
                                    <p>Account: 12345678</p>
                                    <p>Branch: University Branch</p>
                                    <p>Ref: [Your Index Number]</p>
                                </div>

                                <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-zinc-800 transition cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSlipFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    {slipFile ? (
                                        <div className="text-green-600 flex flex-col items-center">
                                            <Check size={32} className="mb-2" />
                                            <p className="font-medium truncate max-w-xs">{slipFile.name}</p>
                                        </div>
                                    ) : (
                                        <div className="text-gray-500 flex flex-col items-center">
                                            <Upload size={32} className="mb-2" />
                                            <p className="font-medium">Click to upload deposit slip</p>
                                            <p className="text-xs mt-1">Images only (JPG, PNG)</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={!slipFile}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Submit for Verification
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
