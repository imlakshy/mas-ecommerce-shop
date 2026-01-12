"use client"
import React, { useState, useEffect, use } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, LucideShoppingBag, Minus, Plus, Share2, Check, Star } from 'lucide-react'
import { supabase } from '@/lib/createSupabaseClient'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const ProductDetailPage = () => {
    const { user } = useAuth();
    const router = useRouter()
    const { id } = useParams();
    const [mounted, setMounted] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const [product, setProduct] = useState(null);
    const [relatedProduct, setRelatedProduct] = useState([]);

    const fetchProductData = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            toast.error('Failed to load product data');
            router.push('/products');
        } else {
            setProduct(data);
            return data;
        }
    }

    const fetchRelatedProducts = async (category, productId) => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category", category)
            .neq("id", productId)
            .limit(8);
        if (error) {
            toast.error('Failed to load related products.');
        } else {
            setRelatedProduct(data);
        }
    }

    useEffect(() => {
        const init = async () => {
            const productData = await fetchProductData();
            if (productData) {
                fetchRelatedProducts(productData.category, productData.id);
                setMounted(true);
            }
        };

        init();
    }, [])

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size')
            return
        }
        if (product?.colors?.length > 0 && !selectedColor) {
            alert('Please select a color')
            return
        }
        toast.success('Product added to cart!')
        setTimeout(() => {
            router.push('/cart')
        }, 1500);
    }
    const handleAddToWishlist = async (productId) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        // Optimistic UI
        setIsWishlisted((prev) => !prev);

        let error;

        if (isWishlisted) {
            // REMOVE
            await supabase
                .from("wishlist")
                .delete()
                .eq("user_id", user.id)
                .eq("product_id", productId);
        } else {
            // ADD
            await supabase
                .from("wishlist")
                .upsert({
                    user_id: user.id,
                    product_id: productId,
                });
        }

        if (error) {
            // rollback UI if DB fails
            setIsWishlisted((prev) => !prev);
            toast.error("Failed to update wishlist");
        }
    };


    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, Math.min(product?.stock, prev + change)))
    }

    const formatPrice = (price) => {
        if (price == null) return "₹—";
        return `₹${Number(price).toLocaleString("en-IN")}`;
    };


    if (!mounted) {
        return null
    }

    return (
        <div className={`min-h-screen bg-white transition-all duration-2000 ease-out
      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Navbar />

            <div className="pt-24 pb-12 px-5 lg:px-[2vw] xl:px-[10vw]">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-600">
                    <span className="cursor-pointer hover:text-primary" onClick={() => router.push('/')}>Home</span>
                    <span className="mx-2">/</span>
                    <span className="cursor-pointer hover:text-primary" onClick={() => router.push('/products')}>{product?.category}</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{product?.name}</span>
                </div>

                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {/* Product Images */}
                        <div className="flex flex-col gap-4 items-center">
                            {/* Main Image */}
                            <div className="relative w-[60%] aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={product?.images[selectedImage]}
                                    alt={product?.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                {product?.discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-r-lg text-sm font-semibold">
                                        -{product?.discount}%
                                    </div>
                                )}

                                <button
                                    onClick={handleAddToWishlist}
                                    className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg transition-all hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`}>
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="max-w-[450px] overflow-x-auto hide-scrollbar">
                                <div className="flex gap-3">
                                    {product?.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all
          ${selectedImage === index ? 'border-primary' : 'border-gray-200'}
        `}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product?.name} view ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            {/* Brand & Name */}
                            <div className="mb-4">
                                <span className="text-sm text-gray-600 font-medium">{product?.brand}</span>
                                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-3">{product?.name}</h1>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">

                                    <span className="text-3xl font-bold">{formatPrice(product?.price)}</span>
                                    {(product?.cost > product?.price) > 0 && (
                                        <>
                                            <span className="text-gray-500 line-through">
                                                {formatPrice(product?.cost)}
                                            </span>
                                            <span className="font-semibold text-primary">
                                                {((product?.cost - product?.price) / product?.cost * 100).toFixed(0)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                                <span className="text-sm text-gray-600">
                                    Inclusive of all taxes
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed line-clamp-3">{product?.description}</p>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-semibold">Size</label>
                                    <button
                                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Size Guide
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product?.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border-2 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {showSizeGuide && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold mb-2">Size Guide</h3>
                                        <p className="text-sm text-gray-600">
                                            This product runs true to size. For best fit, we recommend selecting your usual size.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Color Selection */}
                            {product?.colors.length > 0 && (
                                <div className="mb-6">
                                    <label className="text-sm font-semibold block mb-3">Color</label>
                                    <div className="flex gap-3">
                                        {product?.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedColor(color.name)}
                                                className={`relative w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name
                                                    ? 'border-primary scale-110'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            >
                                                {selectedColor === color.name && (
                                                    <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    {selectedColor && (
                                        <span className="text-sm text-gray-600 mt-2 block">Selected: {selectedColor}</span>
                                    )}
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-6">
                                <label className="text-sm font-semibold block mb-3">Quantity</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className={`p-2 border-2 rounded-lg transition-all ${quantity <= 1
                                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                            : 'border-gray-300 hover:border-primary hover:text-primary'
                                            }`}>
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product?.stock}
                                        className={`p-2 border-2 rounded-lg transition-all ${quantity >= product?.stock
                                            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                            : 'border-gray-300 hover:border-primary hover:text-primary'
                                            }`}>
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Stock Status */}
                            {product?.stock === 0 && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={product?.stock === 0 || !selectedSize || (product?.colors?.length > 0 && !selectedColor)}
                                    className="flex-1 bg-primary text-white py-6 text-base font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <LucideShoppingBag className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={() => handleAddToWishlist(product.id)}
                                    variant="outline"
                                    className="flex-1 border-2 border-gray-300 py-6 text-base font-semibold hover:bg-gray-50"
                                >
                                    <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                                </Button>
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={async () => {
                                    await navigator.clipboard.writeText(window.location.href)
                                    toast.success('Product link copied to clipboard!')
                                }}
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Share this product
                            </button>

                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mb-16 border-t pt-12">
                        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                        <div className="space-y-6">
                            {/* Sample Review */}
                            <div className="border-b pb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-sm font-semibold">JD</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">John Doe</div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-2">2 days ago</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-2">
                                    Great quality hoodie! The fit is perfect and the material is very comfortable.
                                    Highly recommend this product?.
                                </p>
                            </div>

                            <div className="pb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-sm font-semibold">JD</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold">John Doe</div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-2">2 days ago</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 mt-2">
                                    Great quality hoodie! The fit is perfect and the material is very comfortable.
                                    Highly recommend this product?.
                                </p>
                            </div>

                        </div>
                        <Button variant="outline" className="mt-6">
                            View All Reviews
                        </Button>
                    </div>

                    {/* Related Products */}
                    <div className="border-t pt-12">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProduct?.map((item) => (
                                <div
                                    key={item}
                                    className="cursor-pointer group"
                                    onClick={() => router.push(`/product/${item.id}`)}
                                >
                                    <div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden mb-3">
                                        <Image
                                            src={item.images[0]}
                                            alt="Related product"
                                            fill
                                            className="object-cover transition duration-200 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 bg-red-500 text-white px-2 py-1 rounded-r-lg text-xs font-semibold">
                                            {item.price < item.cost ? `-${((item.cost - item.price) / item.cost * 100).toFixed(0)}%` : 'New'}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-600">{item.brand}</span>
                                        <span className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-bold text-sm">₹{item.price}</span>
                                            <span className="text-xs text-gray-400 line-through">₹{item.cost}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default ProductDetailPage

