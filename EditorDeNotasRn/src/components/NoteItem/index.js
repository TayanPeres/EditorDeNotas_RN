import React from 'react'
import {Box, Title} from './styled'

/* recebendo todos os dados que está enviando no NotemItem data,index,onpress linha 41  */
export default ({ data, index, onPress}) => {
    return (
        /* quando clicar no box, execute o onPress que é a função handleNotePress mandando o index */
        <Box onPress={() => onPress(index)}>
            <Title>{data.title}</Title>
        </Box>
    )

}