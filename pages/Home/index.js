import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemEvento from '../../components/itemEvento';

const Home = () => {
    // get set
    const [eventos, setEventos] = useState([]);

    // Assim que a pagina carregar ele ja renderiza o primeiro efeito
    useEffect(() => {
        listarEventos();
    }, [])

    // Método-GET
    const listarEventos = () => {
        fetch(`http://192.168.0.18:5000/api/eventos`)// ip e eventos
            .then(response => response.json())
            .then(dados => {
                // pega o eventos
                setEventos(dados.data);
                console.log(dados.data);
            })
            .catch(err => console.error(err));
    }
    // metodo que renderiza todas as propriedades do evento
    const renderItem = (evento) => {
        return (
            <ItemEvento
                nome={evento.item.nome}
                imagem={evento.item.urlImagem}
                link={evento.item.link} />
        )
    }
    return (
        // HTML da página
        <View>
            <Text>HOME</Text>
            {/* <Text>{token}</Text> */}
            <FlatList
                data={eventos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )

}

export default Home;
