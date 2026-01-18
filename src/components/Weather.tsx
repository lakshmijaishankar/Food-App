import {use} from 'react';
import {Text} from 'react-native-paper';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type Products = Product[];

async function getProducts<T>() {
  const response = await fetch('https://fakestoreapi.com/products', {
    method: 'GET',
  });
  return (await response.json()) as T;
}

export function Weather() {
  const products = use<Products>(getProducts<Products>());
  console.log('products', products);
  return <Text>Weather</Text>;
}
