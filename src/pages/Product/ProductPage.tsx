import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, useIonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Product } from './models/products.model';
import storage from '../../storage';

export const ProductPage = () => {
  const [presentAlert] = useIonAlert();
  const [products, setProducts] = useState<Product[]>([]);
  const [desiredProducts, setDesiredProducts] = useState<Product[]>([]);

  // Obtener productos de la API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await result.json();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          presentAlert({
            header: 'Error',
            subHeader: 'Error al obtener los productos',
            message: `Este es un error: ${error.message}`,
            buttons: ['OK'],
          });
        } else {
          presentAlert({
            header: 'Error',
            subHeader: 'Error desconocido',
            message: 'Ha ocurrido un error inesperado.',
            buttons: ['OK'],
          });
        }
      }
    };
    getProducts();
  }, []);

  // Cargar productos deseados desde el almacenamiento
  useEffect(() => {
    const loadData = async () => {
      const data = await storage.get('productKey');
      if (data && data.length > 0) {
        setDesiredProducts(data);
      }
    };
    loadData();
  }, []);

  // Guardar productos deseados en el almacenamiento
  useEffect(() => {
    const saveData = async () => {
      await storage.set('productKey', desiredProducts);
    };
    if (desiredProducts.length > 0) {
      saveData();
    }else if(desiredProducts.length == 0){
        storage.clear();
    }
  }, [desiredProducts]);

  const updateDesired = (product: Product) => {
    const index = desiredProducts.findIndex(p => p.id === product.id);
    if (index > -1) {
      // Si ya está en la lista de deseados, lo quitamos
      setDesiredProducts(desiredProducts.filter(p => p.id !== product.id));
    } else {
      // Si no está, lo añadimos
      setDesiredProducts([...desiredProducts, product]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {products.length > 0 ? (
            products.map((product) => (
              <IonCard key={product.id}>
                <img alt="Product image" src={product.images[0]} />
                <IonCardHeader>
                  <IonCardTitle>{product.title}</IonCardTitle>
                  <IonCardSubtitle>PRICE: ${product.price}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>{product.description}</IonCardContent>
                <IonButton onClick={() => updateDesired(product)} fill="clear">
                  {desiredProducts.some(p => p.id === product.id) ? 'Quitar' : 'Deseado'}
                </IonButton>
              </IonCard>
            ))
          ) : (
            <p>Productos no encontrados :C....</p>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
