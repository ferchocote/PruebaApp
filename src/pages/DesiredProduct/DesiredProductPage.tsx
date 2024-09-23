import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, useIonAlert } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import storage from '../../storage';
import { Product } from '../Product/models/products.model';

export const DesiredProductPage = (update: boolean) => {
    const [presentAlert] = useIonAlert();
    const [products, setProducts] = useState<Product[]>([]); 
  
    useEffect(() => {
      getProducts();
      
    }, []);


    const getProducts  = async () => {
        try{
          let data: Product[] = [];

            const loadData = async () => {
              data = await storage.get('productKey');
              console.log('Datos cargados:', data);
              if(data != null && data.length >= 1){
                setProducts(data);
              }else{
                setProducts([]);
              }
                 
              console.log('Datos cargados:', data);
            };
            loadData();
            
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

    useEffect(() => {
        getProducts();
        
      }, [update]);
  
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
                  products.length > 0 ? (products.map( product => 
                  <IonCard key={product.id}>
                  <img alt="Silhouette of mountains" src={product.images[0]} />
                  <IonCardHeader>
                    <IonCardTitle>{product.title}</IonCardTitle>
                    <IonCardSubtitle>PRICE: ${product.price}</IonCardSubtitle>
                  </IonCardHeader>
            
                  <IonCardContent>{product.description}</IonCardContent>
                  {/* <IonButton onClick={ e => updateDesired(e, product) } fill="clear">Deseado</IonButton> */}
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
