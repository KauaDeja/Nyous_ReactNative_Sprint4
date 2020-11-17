import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

// Async Storage = semelhante ao localStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {

    // state => {get; set;}
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvar = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
    }
    // Método Logar
    const Logar = () => {
        
        const corpo = {
            email : email,
            senha : senha
        }
        // Ao invés de passarmos a o localhost, agora é o IP
        fetch('http://192.168.0.18:5000/api/Account/login', {
            method: 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status != 404){
                alert('Seja bem vindo');
                console.log(data.token);
                
                salvar(data.token);
                navigation.push('Autenticado');
            }else{
                alert('Email ou senha inválidos! :( ');
            }
        })

    }

    return(
        // Html do React_Native
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                    uri: 'https://raw.githubusercontent.com/sena-code/React-Node/main/4%20-%20Trabalhando%20com%20react-bootstrap%20e%20react-router-dom/nyous-react/src/assets/img/Logo.svg',
                }}
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}// Adiciono um evento ao input 
                value={email}
                placeholder="Digite seu email"
            />

            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}// Adiciono um evento ao input 
                value={senha}
                placeholder="Digite sua senha"
                secureTextEntry={true}// Deixa a senha invísivel
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}//adiciono um evento ao Botao 
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

        </View>
    )
}
// CSS do React_Native
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input : {
        width: '90%',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        marginTop : 20,
        padding: 5,
        borderRadius: 6
    },
    button : {
        backgroundColor : 'black',
        width: '90%',
        padding : 10,
        borderRadius: 6,
        marginTop : 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
        color : 'white'
    },
    logo : {
        width: 200,
        height: 200,
    }
  });

export default Login;