import React from 'react';

interface MaterialCardProps {
    title?: string;
    subTitle?: string;
    icon?: React.ReactNode;
    color?: string; // e.g. "from-blue-600 to-blue-400"
    children: React.ReactNode;
    className?: string;
}

const MaterialCard = ({ title, subTitle, icon, color = "from-blue-600 to-blue-400", children, className = "" }: MaterialCardProps) => {
    return (
        <div className={`relative flex flex-col min-w-0 break-words bg-white dark:bg-[#202940] shadow-xl rounded-xl mt-6 ${className}`}>
            {/* Floating Header */}
            {(title || icon) && (
                <div className="mx-4 -mt-6 p-4 rounded-xl bg-gradient-to-tr shadow-lg text-white flex items-center justify-between relative z-10"
                    style={{ backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops))` }}
                >
                    {/* We apply the gradient classes to a wrapper or directly to the div if we can parse the color string, 
                         but since we pass 'from-X to-Y', we can just append them to the className if we construct it right. 
                         Actually, standard Tailwind gradients need the base classes.
                     */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${color} opacity-100 z-[-1] shadow-md`}></div>

                    <div className="flex items-center gap-3">
                        {icon && <div className="p-1">{icon}</div>}
                        <div className="flex flex-col">
                            {title && <h3 className="text-lg font-bold">{title}</h3>}
                            {subTitle && <p className="text-sm opacity-80">{subTitle}</p>}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-auto p-4 pt-6 text-gray-700 dark:text-gray-200">
                {children}
            </div>
        </div>
    );
};

export default MaterialCard;
