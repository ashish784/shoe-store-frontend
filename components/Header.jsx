// import Link from 'next/link';
// import React, {useState, useEffect } from "react";
// import Menu from "./Menu";
// import Wrapper from './Wrapper';
// import MenuMobile from './MenuMobile';

// import { IoMdHeartEmpty } from "react-icons/io";
// import { BsCart } from "react-icons/bs";
// import { BiMenuAltRight } from "react-icons/bi";
// import { VscChromeClose } from "react-icons/vsc";
// import { fetchDataFromApi } from '@/utils/api';
// import { useSelector } from 'react-redux';
// import SearchBar from './SearchBar';


// const Header = () => {
//     const [mobileMenu, setMobileMenu] = useState(false);
//     const [showCatMenu, setShowCatMenu] = useState(false);
//     const [show, setShow] = useState("translate-y-0");
//     const [lastScrollY, setLastScrollY] = useState(0);
//     const [categories, setCategories] = useState(null);

//     const {cartItems} = useSelector((state) => state.cart);

//     const controlNavbar = () => {
//          if(window.scrollY > 200) {
//              if(window.scrollY > lastScrollY && !mobileMenu){
//                   setShow("-translate-y-[80px]");
//              } else {
//                   setShow("shadow-sm");
//              }     
//          } else {
//              setShow("translate-y-0");
//          }
//          setLastScrollY(window.scrollY);
//     };

//     useEffect(()=> {
//         window.addEventListener("scroll", controlNavbar);
//         return ()=> {
//             window.removeEventListener("scroll", controlNavbar)
//         }
//     }, [lastScrollY]);

//     useEffect(()=> {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//          const {data} = await fetchDataFromApi("/api/categories?populate=*");
//          setCategories(data);
//     };
  
//     return (
//     <header 
//         className={`w-full h-[50px] md:h-[80px] bg-white flex items-center 
//         justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
//     >
//         <Wrapper className="h-[60px] flex justify-between items-center">
//             <Link href="/">
//             <img src="/logo.svg" className="w-[40px] md:w-[60px]" />
//             </Link>
//             <Menu 
//                 showCatMenu={showCatMenu}  
//                 setShowCatMenu={setShowCatMenu} 
//                 categories={categories}
//             />

//             {mobileMenu && 
//             (<MenuMobile 
//                 showCatMenu={showCatMenu}  
//                 setShowCatMenu={setShowCatMenu}
//                 setMobileMenu={setMobileMenu}
//                 categories={categories}
//                 />
//             )}

//             <div className="flex items-center gap-2 text-black">

//                   {/* Heart Icon Start*/}
//                 <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center
//                 hover:bg-black/[0.05] cursor-pointer relative">
//                     <IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
//                     <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
//                     rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white 
//                     text-[10px] md:text-[12px] flex justify-center items-center px-[2px]
//                     md:px-[5px]">51</div>
//                 </div>
//                   {/* Heart Icon End*/}
                  
//                   {/* Cart Icon Start*/}
//                   <Link href="/cart">
//                 <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center
//                        hover:bg-black/[0.05] cursor-pointer relative">
//                        <BsCart className="text-[15px] md:text-[20px]" />
//                     {cartItems.length > 0 && <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
//                     rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white 
//                     text-[10px] md:text-[12px] flex justify-center items-center px-[2px]
//                     md:px-[5px]">
//                            {cartItems.length}
//                         </div>}
//                 </div>
//                   </Link>
                
//                   {/* Cart Icon End*/}
                  
//                   {/*Mobile Icon Start*/}
//                   <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center
//                 hover:bg-black/[0.05] cursor-pointer relative -mr-2">
//                     {mobileMenu ? (
//                         <VscChromeClose className="text-[16px]"
//                            onClick = {() => setMobileMenu(false)}
//                         />
//                     ) : (
//                         <BiMenuAltRight className="text-[20px]"
//                            onClick = {() => setMobileMenu(true)}
//                         />
//                     )}
//                 </div>
//                   {/*Mobile Icon ENd*/}

//             </div>
//         </Wrapper>
//     </header>
//     );
// };

// export default Header;

import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight, BiSearch } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import SearchButton from './SearchButton';


const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-xl font-bold">Logo</a>
            </Link>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
              />
              <button type="submit" className="flex items-center justify-center p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                <BiSearch size={20} />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-2 text-black">
            {/* Heart Icon */}
            <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[19px]" />
              <div className="h-[14px] min-w-[14px] rounded-full bg-red-600 absolute top-1 left-5 text-white text-[10px] flex justify-center items-center px-[2px]">51</div>
            </div>

            {/* Cart Icon */}
            <Link href="/cart">
              <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <BsCart className="text-[15px]" />
                {cartItems.length > 0 && <div className="h-[14px] min-w-[14px] rounded-full bg-red-600 absolute top-1 left-5 text-white text-[10px] flex justify-center items-center px-[2px]">{cartItems.length}</div>}
              </div>
            </Link>

            {/* Mobile Menu Icon */}
            <div className="w-8 h-8 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <VscChromeClose className="text-[16px]" /> : <BiMenuAltRight className="text-[20px]" />}
            </div>
          </div>
        </div>
        {mobileMenu && <MobileMenu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} />}
      </div>
    </header>
  );
};

const MobileMenu = ({ showCatMenu, setShowCatMenu }) => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <div className="md:hidden bg-white py-2">
      <ul className="space-y-2 px-4">
        <li>Menu 1</li>
        <li>Menu 2</li>
        <li>Menu 3</li>
        {/* Render categories dynamically */}
        {categories && categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Header;


