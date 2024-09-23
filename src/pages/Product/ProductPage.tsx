import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonViewWillEnter, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, useIonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Product } from './models/products.model';
import storage from '../../storage';

export const ProductPage = () => {

    const [presentAlert] = useIonAlert();
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product | null>(null);  // Inicializa correctamente
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
                    console.log(error.message);
                    presentAlert({
                        header: 'Alert',
                        subHeader: 'Error al obtener los productos',
                        message: `Este es un error: ${error.message}`,
                        buttons: ['OK'],
                    });
                } else {
                    console.log('Error desconocido:', error);
                    presentAlert({
                        header: 'Alert',
                        subHeader: 'Error desconocido',
                        message: 'Ha ocurrido un error inesperado.',
                        buttons: ['OK'],
                    });
                }
            }
        };

        getProducts();
    }, []);

    // Manejar el almacenamiento de productos deseados
    useEffect(() => {
        const loadData = async () => {
            const data = await storage.get('productKey');
            if (data && data.length > 0) {
                setDesiredProducts(data);
            }
        };

        const saveData = async () => {
            if (desiredProducts.length > 0) {
                var index = desiredProducts.findIndex(f => f.id === product?.id);
                if(index > 0){
                    setDesiredProducts(desiredProducts.splice(index, 1));
                }else{
                    if (product) {
                        setDesiredProducts((desiredProducts) => [...desiredProducts, product]); 
                    }
                }

                await storage.set('productKey', desiredProducts);
            } else {
                if (product) {
                    setDesiredProducts((prevProducts) => [...prevProducts, product]);
                    await storage.set('productKey', desiredProducts); // Añadir producto deseado
                }
            }
        };

        loadData();
        saveData();
    }, [product]);

    const updateDesired = (product: Product) => {
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
                                <IonButton onClick={() => updateDesired(product)} fill="clear">Deseado</IonButton>
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
