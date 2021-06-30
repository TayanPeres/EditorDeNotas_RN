import React, { useLayoutEffect} from 'react'
import { Container, AddButton, AddButonImage, NotesList,
         NoNotes, NoNotesImage, NoNotesText } from './styled'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import NoteItem from '../../components/NoteItem'

export default () => {

    const navigation = useNavigation()
    /* notes é o nome do combainer, e list que é o nome do dado que esta pegando */
    const list = useSelector(state => state.notes.list)
  

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Suas notas',
            headerRight: () => (
                <AddButton underlayColor="transparent" onPress={() => navigation.navigate('EditNode')}>
                    <AddButonImage source={require('../../assets/more.png')} />
                </AddButton>
            )
        })
    }, [])
  /*  */
    const handleNotePress = (index) => {
        /* mandando pra outra tela, e manda um key com index, edit  o index  */
        navigation.navigate('EditNode', {
            /* chave key que manda o index */
            key: index
        })

    }

    return (
        <Container>
            /* apareça a lista se for maior que 0  */
         {list.length > 0 && 
         /* data é a lista */
            <NotesList data={list}
            /* renderiza, recebo item e index da minha lista */
             renderItem={({item, index}) => (
                 /* ir pra tela de cadastro com os dados do item salvo,
                   por isso manda o index q vai identificar o item e pegar o dados no reduces   */
                 <NoteItem data={item}
                   index={index}
                   onPress={handleNotePress}
                 />
             )}
             /* vai pegar o index e transformar em string */
             keyExtractor={(item, index) => index.toString() }
            />
         } 
         /* se lista for igual a 0,exige q n tem nenhuma  */
             {list.length == 0 && 
                <NoNotes>
                    <NoNotesImage source={require('../../assets/note.png')} />
                    <NoNotesText>Nenhuma anotação</NoNotesText>
                </NoNotes>
             
             }
            
        </Container>
    )
}