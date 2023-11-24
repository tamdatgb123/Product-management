import React from "react";
import ProductCard from "../../Components/ProductCard";
import data from "../../../db.json";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [productList, setProductList] = React.useState(null);

    React.useEffect(() => {
        setProductList(data.products);
    }, []);
    return (
        <>
        <h1 className="text-3xl">Home Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productList && productList.map((item) => (
                <div 
                    key={item.id}
                    className="w-full p-4 cursor-pointer" 
                    onClick={() => navigate(`/product-detail/${item.id}`)}
                >
                    <ProductCard 
                        images="https://down-vn.img.susercontent.com/file/916e25a4ebe9cdd2031e07e0e6d4fbee"
                        name="Bàn Phím Cơ Blue Switch MOFII Candy M Chính Hãng Đa Màu Sắc"
                        price="719000"
                        city="TP.Ho Chi Minh"
                    />
                </div>
            ))}
        </div>
        
        </>
    )
}

export default HomePage;