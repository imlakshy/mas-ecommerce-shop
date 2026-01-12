"use client"
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Search, Filter, X, Grid, List, ChevronDown, ChevronUp, Star } from 'lucide-react'
import { supabase } from '@/lib/createSupabaseClient'

const ProductsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'


  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [sortBy, setSortBy] = useState('relevance')
  const [showCategoryFilter, setShowCategoryFilter] = useState(true)
  const [showBrandFilter, setShowBrandFilter] = useState(true)
  const [showGenderFilter, setShowGenderFilter] = useState(true)
  const [showPriceFilter, setShowPriceFilter] = useState(true)


  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");


    if (error) {
      console.error(error);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, [])

  // Extract unique values for filters
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const brands = [...new Set(products.map(p => p.brand))]
  const genders = [...new Set(products.map(p => p.gender))]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    const q = searchQuery.toLowerCase();

    filtered = filtered.filter(product =>
      product.name?.toLowerCase().includes(q) ||
      product.brand?.toLowerCase().includes(q) ||
      product.category?.toLowerCase().includes(q)
    );

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      )
    }

    // Gender filter
    if (selectedGenders.length > 0) {
      filtered = filtered.filter(product =>
        selectedGenders.includes(product.gender)
      )
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Relevance - keep original order
        break
    }

    return filtered
  }, [products, searchQuery, selectedCategories, selectedBrands, selectedGenders, priceRange, sortBy])

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const handleGenderToggle = (gender) => {
    setSelectedGenders(prev =>
      prev.includes(gender)
        ? prev.filter(g => g !== gender)
        : [...prev, gender]
    )
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedGenders([])
    setPriceRange([0, 50000])
    setSearchQuery('')
    setSortBy('relevance')
  }

  const formatPrice = (price) => {
    if (price == null) return "₹—";
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };


  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedGenders.length +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0)

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen bg-white transition-all duration-500 ease-out
      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <Navbar />

      <div className="pt-24 pb-12 px-5 lg:px-[2vw] xl:px-[10vw]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-gray-50 rounded-lg p-5 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-primary hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                    className="flex items-center justify-between w-full mb-3 font-semibold"
                  >
                    <span>Category</span>
                    {showCategoryFilter ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {showCategoryFilter && (
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowBrandFilter(!showBrandFilter)}
                    className="flex items-center justify-between w-full mb-3 font-semibold"
                  >
                    <span>Brand</span>
                    {showBrandFilter ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {showBrandFilter && (
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gender Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowGenderFilter(!showGenderFilter)}
                    className="flex items-center justify-between w-full mb-3 font-semibold"
                  >
                    <span>Gender</span>
                    {showGenderFilter ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {showGenderFilter && (
                    <div className="space-y-2">
                      {genders.map(gender => (
                        <label key={gender} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedGenders.includes(gender)}
                            onChange={() => handleGenderToggle(gender)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{gender}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className="flex items-center justify-between w-full mb-3 font-semibold"
                  >
                    <span>Price Range</span>
                    {showPriceFilter ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {showPriceFilter && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Best Discount</option>
                    <option value="newest">Newest First</option>
                  </select>

                  <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                        }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                        }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedGenders.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map(category => (
                    <span
                      key={category}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className="hover:text-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedBrands.map(brand => (
                    <span
                      key={brand}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {brand}
                      <button
                        onClick={() => handleBrandToggle(brand)}
                        className="hover:text-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {selectedGenders.map(gender => (
                    <span
                      key={gender}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {gender}
                      <button
                        onClick={() => handleGenderToggle(gender)}
                        className="hover:text-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 mb-2">No products found</p>
                  <p className="text-gray-500">Try adjusting your filters or search query</p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                      : 'flex flex-col gap-6'}>
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => router.push(`/product/${product.id}`)}
                      className={`group cursor-pointer ${viewMode === 'list'
                        ? 'flex flex-row gap-4 border-b pb-6'
                        : 'flex flex-col'
                        }`}>
                      {/* Product Image */}
                      <div
                        className={`relative bg-gray-100 rounded-lg overflow-hidden ${viewMode === 'list'
                          ? 'w-32 h-32 md:w-40 md:h-40 flex-shrink-0'
                          : 'aspect-[2/3]'
                          }`}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-200 group-hover:scale-110"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-r-lg text-xs font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Add to wishlist logic
                          }}
                          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                        >
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className={viewMode === 'list' ? 'flex-1' : 'mt-3'}>
                        <span className="text-xs text-gray-600 block mb-1">{product.brand}</span>
                        <h3 className={`font-semibold line-clamp-1 group-hover:text-primary transition-colors ${viewMode === 'list' ? 'text-base' : 'text-sm'
                          }`}>
                          {product.name}
                        </h3>
                        {viewMode === 'list' && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.category} • {product.gender}
                          </p>
                        )}
                        
                        <div className={`flex items-center gap-2 mt-2 ${viewMode === 'list' ? 'flex-col items-start' : ''
                          }`}>
                          <span className={`font-bold ${viewMode === 'list' ? 'text-lg' : 'text-sm'}`}>
                            {formatPrice(product.price)}
                          </span>
                          {product.price < product.cost && (
                            <>
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(product.cost)}
                              </span>
                              <span className="text-xs text-primary font-semibold">
                                {((product.cost - product.price) / product.cost * 100).toFixed(0)}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductsPage

