import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ProductItem from './ProductItem';

export default function ProductList() {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const url = categoryId ? `/api/products/category/${categoryId}` : '/api/products';
    //     axios.get(url)
    //         .then(response => setProducts(response.data))
    //         .catch(error => console.error(error));
    // }, [categoryId]);

    return (
        // <div className="w-3/4 p-4">
        //     <h2 className="text-xl font-bold mb-4">Products</h2>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //         {/* {products.map(product => (
        //             <ProductItem key={product._id} product={product} />
        //         ))} */}
        //         <h3 className="text-lg font-semibold">Test</h3>
        //                 <p className="text-gray-600">test</p>
        //                 <p className="text-green-600 font-bold">test</p>

        //     </div>
        // </div>



<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-6">
    

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

    <div class="w-60 p-1 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div class="relative">
        <img src="download (1).jpeg" alt="Mountain landscape" class="w-full h-48 object-cover"></img>
      </div>
      <div class="p-4">
        <h3 class="text-xl font-semibold mb-2">Heading</h3>
        <p class="text-gray-600 text-sm mb-4">Simple Yet Beautiful Card Design with TailwindCSS. Subscribe to our Youtube channel for more ...</p>
        <button class="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>

  </div>
</div>
    );
}
