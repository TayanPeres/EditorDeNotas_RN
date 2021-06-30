import React, { useState, useEffect, useLayoutEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Container, TitleInput, BodyInput, SaveButton, SaveButtonImage, 
         CloseButton, CloseButtonImage, DeleteButton, DeleteButtonText } from './styled'

export default () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch =  useDispatch()
    /* notes é o nome do reducer e ta pegando a lista */
    const list = useSelector(state => state.notes.list)

    const [ title, setTitle] = useState('')
    const [body, setBody] = useState('')
    /* vai salvar se a gente ta adicionando o status, se é ediçao ou nova anotação */
    const [status, setStatus] = useState('new')

    useEffect(() => {
        /* estamos mandando o params key do index da listScreen,
        caso n manda o parametro . O parametro que estamos mandando é o key em listScreen linha 29.
        se isso for diferente de undefined(se tiver definido o key), é que mandou. depois se list tem o key */
        if(route.params?.key != undefined && list[route.params.key]){
            setStatus('edit')
            setTitle(list[route.params.key].title)
            setBody(list[route.params.key].body)
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            
            title: status == 'new' ? 'Nova anotação' : 'Editar anotação',
           headerLeft: () => (
               <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
                   <CloseButtonImage source={require('../../assets/close.png')} />
               </CloseButton>
           ),
            headerRight: () => (
                <SaveButton underlayColor="Transparent" onPress={handleSaveButton}>
                    <SaveButtonImage source={require('../../assets/save.png')} />
                </SaveButton>
            )
        })
        /* vai monitorar  */
    }, [status, title, body])


    const handleSaveButton = () =>{
        /* se titulo e o body tiver diferente de vazio  */
        if(title != '' && body != '') {
            if(status == 'edit'){
                /* vai fazer uma ação  */
                dispatch({
                    type: 'EDIT_NOTE',
                    /* vai mandar o key, title, body  */
                    payload: {
                        key: route.params.key,
                        title, body
                    }
                })

            } else {
                dispatch({
                    /* adicionar uma nova anotação, vai enviar o title e o body */
                    type: 'ADD_NOTE',
                    payload: {title, body }
                })
            }
            /* voltando pra tela */
            navigation.goBack()

        } else {
            /* se tiver vazio */
            alert('Preencha o titulo e corpo')
        }
    }

    const handleCloseButton = () => {
        navigation.goBack()
    }
    const handleDeleteButton = () =>{
        dispatch({
            type: 'DEL_NOTE',
            payload: {
                key: route.params.key
            }
        })
        navigation.goBack()
    }
    return (
        <Container>
            <TitleInput value={title} onChangeText={t=> setTitle(t)}
                         placeholder="Digite o titulo da anotação"
                         placeholderTextColor="#CCC"
                         /* teclado aberto e pronto pra digitar  */
                         autoFocus={true} />

            <BodyInput value={body} onChangeText={t => setBody(t)}
                          placeholder="Digite o corpo da anotação"
                          placeholderTextColor="#CCC"
                         multiline={true}
                         textAlignVertical="top" />
            {status == 'edit' && 
               <DeleteButton underlayColor="#FF0000" onPress={handleDeleteButton}>
                   <DeleteButtonText>Exlcuir Anotação</DeleteButtonText>
             </DeleteButton>
                   }
        </Container>
    )
}