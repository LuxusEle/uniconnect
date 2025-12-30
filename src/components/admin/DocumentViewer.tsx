"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle, ZoomIn, ZoomOut } from "lucide-react";
import Image from "next/image";

interface VerificationItem {
    id: string;
    studentName: string;
    nic: string;
    docUrl: string;
    docType: "NIC" | "BirthCert" | "ResultSheet";
    submittedAt: string;
}

interface DocumentViewerProps {
    item: VerificationItem;
    onApprove: (id: string) => void;
    onReject: (id: string, reason: string) => void;
}

export default function DocumentViewer({ item, onApprove, onReject }: DocumentViewerProps) {
    const [zoom, setZoom] = useState(1);
    const [rejectReason, setRejectReason] = useState("");
    const [isRejecting, setIsRejecting] = useState(false);

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6">
            {/* Left: Metadata & Actions */}
            <div className="w-1/3 bg-white dark:bg-zinc-800 rounded-2xl shadow-soft-xl p-6 overflow-y-auto border-none">
                <h2 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Verification Details</h2>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Student Name</label>
                        <p className="font-medium text-lg">{item.studentName}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">NIC Number</label>
                        <p className="font-mono text-lg">{item.nic}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Document Type</label>
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-md">
                            {item.docType}
                        </span>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Submitted At</label>
                        <p className="text-sm">{item.submittedAt}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {!isRejecting ? (
                        <>
                            <button
                                onClick={() => onApprove(item.id)}
                                className="w-full py-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                            >
                                <CheckCircle size={20} />
                                Approve Document
                            </button>
                            <button
                                onClick={() => setIsRejecting(true)}
                                className="w-full py-3 flex items-center justify-center gap-2 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                            >
                                <XCircle size={20} />
                                Reject Document
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                            <textarea
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="Reason for rejection..."
                                className="w-full p-3 border rounded-lg dark:bg-zinc-900 border-gray-300 dark:border-zinc-600 focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                rows={3}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsRejecting(false)}
                                    className="w-1/2 py-2 text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onReject(item.id, rejectReason)}
                                    disabled={!rejectReason}
                                    className="w-1/2 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                                >
                                    Confirm Reject
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Image Viewer */}
            <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden relative flex items-center justify-center group">
                <div className="absolute top-4 right-4 z-10 flex gap-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full">
                        <ZoomOut size={16} />
                    </button>
                    <button onClick={() => setZoom(1)} className="px-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-mono flex items-center">
                        {Math.round(zoom * 100)}%
                    </button>
                    <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full">
                        <ZoomIn size={16} />
                    </button>
                </div>

                <div className="relative w-full h-full overflow-auto flex items-center justify-center" style={{ cursor: zoom > 1 ? 'grab' : 'default' }}>
                    {/* Mock Image for now - replace with item.docUrl */}
                    <div
                        style={{
                            transform: `scale(${zoom})`,
                            transition: 'transform 0.2s ease-out'
                        }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        <img
                            src={item.docUrl || "https://placehold.co/1200x1600/1f2937/white?text=Document+Preview"}
                            alt="Document"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
