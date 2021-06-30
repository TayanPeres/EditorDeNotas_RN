import styled from "styled-components";

export const Container = styled.View`
    flex: 1;
    background-color: #333;
    justify-content: center;
    align-items: center;
`
export const AddButonImage = styled.Image`
    height: 24px;
    width: 24px;
`
export const AddButton = styled.TouchableHighlight` 
    margin-right: 15px;
`


export const NotesList = styled.FlatList`
    flex: 1;
    width: 100%;
`
export const NoNotes = styled.View`
    justify-content: center;
    align-items: center;
`

export const NoNotesImage = styled.Image`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`

export const NoNotesText = styled.Text`
    font-size: 17px;
    color: #FFF;
`