"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { CheckCircle2, X } from 'lucide-react'

export default function CartAddedPopup({ open, product, qty = 1, size, color, onClose, onGoToCart }) {
    const [isVisible, setIsVisible] = React.useState(false)

    useEffect(() => {
        if (open) {
            setIsVisible(true)
        }
    }, [open])

    if (!open || !product) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* Toast-style popup at top-right below navbar */}
            <div className={`fixed top-24 right-1/2 md:right-4 z-50 max-w-sm transition-all duration-300 transform ${isVisible
                    ? 'translate-x-1/2 md:translate-x-0 opacity-100'
                    : 'translate-x-[120%] opacity-0'
                }`}>
                <div className="bg-white rounded-xl shadow-xl border border-green-100 overflow-hidden">
                    {/* Success header */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-green-100 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-semibold text-green-700">Added to Cart</span>
                        <button
                            onClick={onClose}
                            className="ml-auto p-1 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Product details */}
                    <div className="p-4 flex gap-4">
                        <div className="w-20 h-28 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                                src={product.images?.[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div>
                                <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">{product.name}</h3>
                                <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
                            </div>

                            <div className="mt-3 space-y-1 text-xs text-gray-600">
                                <div className="flex justify-between">
                                    <span>Quantity:</span>
                                    <span className="font-medium text-gray-900">{qty}</span>
                                </div>
                                {size && (
                                    <div className="flex justify-between">
                                        <span>Size:</span>
                                        <span className="font-medium text-gray-900">{size}</span>
                                    </div>
                                )}
                                {color && (
                                    <div className="flex justify-between items-center">
                                        <span>Color:</span>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full border border-gray-300"
                                                style={{ backgroundColor: color }}
                                            />
                                            <span className="font-medium text-gray-900">{color}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={onGoToCart}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                                >
                                    View Cart
                                </button>

                                <button
                                    onClick={onClose}
                                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg font-medium text-sm transition-colors"
                                >
                                    Keep Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
