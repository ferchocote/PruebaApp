import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonViewWillEnter, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, useIonAlert } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { Product } from './models/products.model';
// import storage from '../../storage';

export const ProductPage = () => {

  const [presentAlert] = useIonAlert();
  const [products, setProducts] = useState<Product[]>([]);  
  const [product, setProduct] = useState({});  

  useEffect(() => {
    const getProducts  = async () => {
        try{
            const result = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await result.json();
            setProducts(data);
        } catch(error: unknown){
            if (error instanceof Error) {
                console.log(error.message); // Accede a la propiedad message
                presentAlert({
                  header: 'Alert',
                  subHeader: 'Error al obtener los productos',
                  message: `Este es un error: ${error.message}`,
                  buttons: ['OK'],
                });
              } else {
                // Si no es un Error, maneja el caso desconocido
                console.log('Error desconocido:', error);
                presentAlert({
                  header: 'Alert',
                  subHeader: 'Error desconocido',
                  message: 'Ha ocurrido un error inesperado.',
                  buttons: ['OK'],
                });
              }
           
        }
    }

    getProducts();
    
    
  }, []);

//   useEffect(() => {
//     const saveData = async () => {
//       await storage.set('myKey', { name: 'Ionic', version: '5' });
//     };

//     const loadData = async () => {
//       const data = await storage.get('myKey');
//       console.log('Datos cargados:', data);
//     };

//     saveData();
//     loadData();
//   }, [product]);

  const updateDesired = (e: any, product: Product) => {
   console.log(product);
   setProduct(product);
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
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
            {
                products.length >= 1 ? (products.map( product => 
                <IonCard key={product.id}>
                <img alt="Silhouette of mountains" src={product.images[0]} />
                <IonCardHeader>
                  <IonCardTitle>{product.title}</IonCardTitle>
                  <IonCardSubtitle>PRICE: ${product.price}</IonCardSubtitle>
                </IonCardHeader>
          
                <IonCardContent>{product.description}</IonCardContent>
                <IonButton onClick={ e => updateDesired(e, product) } fill="clear">Deseado</IonButton>
              </IonCard>
            
                
             ))
             :(
                  <p>Productos no encontrados :C....</p>
            )
            }

        </IonList>   
      </IonContent>
    </IonPage>
  )
}

