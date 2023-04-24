import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import productApi from "src/apis/product.api"
import ProductRating from "../ProductList/components/ProductRating"
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from "src/utils/utils"
import InputNumber from "src/components/InputNumber"
import DOMPurify from "dompurify"
import { useEffect, useMemo, useRef, useState } from "react"
import { Product as ProductType, ProductListConfig } from "src/types/product.type"
import Product from "../ProductList/components/Product"
import QuantityController from "src/components/QuantityController"
import purchaseApi from "src/apis/purchase.api"
import { toast } from "react-toastify"
import { purchasesStatus } from "src/constants/purchase"
import path from "src/constants/path"
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

export default function ProductDetail() {
    const { t } = useTranslation(['product'])
    const queryClient = useQueryClient()
    const [buyCount, setBuyCount] = useState(1)
    const {nameId} = useParams()
    const id = getIdFromNameId(nameId as string)
    const [currentIndexImages, setCurrentIndexImages] = useState([0,5])
    const [activeImage, setActiveImage] = useState('')
    const {data: productDetailData} = useQuery(
        {
            queryKey: ['product', id],
            queryFn: () => productApi.getProductDetail(id as string)
        }
    )
    const product = productDetailData?.data.data
    const imageRef = useRef<HTMLImageElement>(null)
    const currentImages = useMemo(
        () => 
            (product ? product.images.slice(...currentIndexImages) : []), 
        [product, currentIndexImages]
    )
    const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id}
    const {data: productsData} = useQuery(
        {
            queryKey: ['product', queryConfig],
            queryFn: () => {
                return productApi.getProducts(queryConfig)
            },

        }
    )
    const addToCartMutation = useMutation(purchaseApi.addToCart)
    const navigate = useNavigate()
    useEffect(() => {
        if (product && product.image.length > 0) {
            setActiveImage(product.images[0])
        }
    }, [product])
    const next = () => {
        if (currentIndexImages[1] < (product as ProductType)?.images.length) {
            setCurrentIndexImages(prev => [prev[0] + 1, prev[1] + 1])
        }
    }
    const prev = () => {
        if (currentIndexImages[0] > 0) {
            setCurrentIndexImages(prev => [prev[0] - 1, prev[1] - 1])

        }
    }
    const chooseActive = (img: string) => {
        setActiveImage(img);
    }
    const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const image = imageRef.current as HTMLImageElement
        const { naturalHeight, naturalWidth } = image
        const offsetX = event.pageX - (rect.x + window.scrollX)
        const offsetY = event.pageY - (rect.y + window.scrollY)

        const top = offsetY * (1 - naturalHeight / rect.height)
        const left = offsetX * (1 - naturalWidth / rect.width)
        image.style.width = naturalWidth + 'px'
        image.style.height = naturalHeight + 'px'
        image.style.maxWidth = 'unset'
        image.style.top = top + 'px'
        image.style.left = left + 'px'
    }
    const handleRemoveZoom = () => {
        imageRef.current?.removeAttribute('style')
    }
    if (!product) return null;
    const handleBuyCount = (value: number) => {
        setBuyCount(value)
    }
    const addToCart = () => {
        addToCartMutation.mutate(
          { buy_count: buyCount, product_id: product?._id as string },
          {
            onSuccess: (data) => {
              toast.success(data.data.message, { autoClose: 1000 })
              queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
            }
          }
        )
    }
    const buyNow = async () => {
        const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
        const purchase = res.data.data
        navigate(path.cart, {
          state: {
            purchaseId: purchase._id
          }
        })
    }
    return (
        <div className="bg-gray-200 py-6">
            <Helmet>
                <title>{product.name} | Gear3S</title>
            </Helmet>
            <div className="container">
                <div className="bg-white p-4 shadow">
                    <div className="grid grid-cols-12 gap-9">
                        <div className="col-span-5">
                            <div 
                                className="relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow" 
                                onMouseMove={handleZoom}                 
                                onMouseLeave={handleRemoveZoom}
                            >
                                <img 
                                    src={activeImage}
                                    alt={product?.name}
                                    className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                                    ref={imageRef}
                                />
                            </div>
                            <div className="relative mt-4 grid grid-cols-5">
                                <button className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white" onClick={prev}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                {
                                    currentImages.map((img) => {
                                        const isActive = img === activeImage;
                                        return(
                                            <div className="relative w-full pt-[100%]" key={img} onMouseEnter={() => chooseActive(img)}>
                                                <img 
                                                    src={img}
                                                    alt={product.name}
                                                    className="absolute top-0 left-0 h-full w-full bg-white object-cover"
                                                />
                                                {
                                                    isActive && <div className="absolute inset-0 border-2 border-orange">                                            
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <button className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white" onClick={next}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="col-span-7">
                            <h1 className="text-xl font-medium uppercase">
                                {product.name}
                            </h1>
                            <div className="mt-8 flex items-center">
                                <div className="flex items-center">
                                    <span className="mr-1 border-b-orange text-orange">
                                        {product.rating}
                                    </span>
                                    <ProductRating 
                                        rating={product.rating} 
                                        activeClassname="fill-orange text-orange h-4 w-4"
                                        nonActiveClassname="fill-orange text-gray-300 h-4 w-4"    
                                    />
                                </div>
                                <div className="mx-4 h-4 w-[1px] bg-gray-300">
                                    
                                </div>
                                <div>
                                    <span>{formatNumberToSocialStyle(product.sold)}</span>
                                    <span className="ml-1 text-gray-500 text-center">Đã bán</span>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center px-5 py-4 bg-gray-50 ">
                                <div className="text-gray-500 line-through">
                                    đ{formatCurrency(product.price_before_discount)}
                                </div>
                                <div className="ml-3 text-3xl font-medium text-orange">
                                    đ{formatCurrency(product.price)}
                                </div>
                                <div className="ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white">
                                    {rateSale(product.price_before_discount, product.price)} giảm
                                </div>
                            </div>
                            <div className="mt-8 flex items-center">
                                <div className="capitalize text-gray-500">
                                    Số lượng
                                </div>
                                <QuantityController 
                                    onDecrease={handleBuyCount} 
                                    onIncrease={handleBuyCount} 
                                    onType={handleBuyCount}
                                    value={buyCount}
                                />
                                <div className="ml-6 text-sm text-gray-500">
                                    {product.quantity} sản phẩm có sẵn
                                </div>
                            </div>
                            <div className="mt-8 flex items-center">
                                <button onClick={addToCart} className="shadow-sm hover:bg-orange/5 flex h-12 items-center justify-center border rounded-sm border-orange bg-orange/10 px-5 capitalize text-orange">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    Thêm vào giỏ hàng
                                </button>
                                <button 
                                    onClick={buyNow} 
                                    className="ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90">
                                    Mua ngay
                                </button>
                            </div>
                                                        
                            <div className="relative overflow-x-auto mt-5">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Loại thiết bị
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                RAM
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Bộ nhớ
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Hãng
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Điện thoại
                                            </th>
                                            <td className="px-6 py-4">
                                                8GB
                                            </td>
                                            <td className="px-6 py-4">
                                                64GB
                                            </td>
                                            <td className="px-6 py-4">
                                                APPLE
                                            </td>
                                        </tr>   
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Điện thoại
                                            </th>
                                            <td className="px-6 py-4">
                                                16GB
                                            </td>
                                            <td className="px-6 py-4">
                                                64GB
                                            </td>
                                            <td className="px-6 py-4">
                                                APPLE
                                            </td>
                                        </tr>   
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="mt-8 bg-white p-4 shadow">
                    <div className="rounded bg-gray-50 p-4 text-lg capitalize text-slate-700">
                        Mô tả sản phẩm
                    </div>
                    <div className="mx-4 mt-12 mb-4 text-sm leading-loose">
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description)
                        }}>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="container">
                        <div className="uppercase text-gray-400">
                            CÓ THỂ BẠN CŨNG SẼ MUA
                        </div>
                        {
                            productsData && (
                                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                    {productsData.data.data.products.map((product) => (
                                        <div className="col-span-1" key={product._id}>
                                            <Product product={product}/>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
