/*  */

const initialState = {
    list: [
        {title: 'Primeira Nota', body: 'Testando 123'}
    ]
}

export default (state = initialState, action) => {
    /* criando uma nova lista, que vai ser uma copia de state.list */
    let newList = [...state.list]

    switch(action.type) {
        case 'ADD_NOTE':
            /* aidicionando uma nota nova dentro da lista  */
            newList.push({
                title: action.payload.title,
                body: action.payload.body
            })
            break

         case 'EDIT_NOTE':
             /* se ele existir,  */
             if(newList[action.payload.key]) {
                 /* vai alterar o title e o body, alterou o proprio item */
                 newList[action.payload.key] = {
                     title: action.payload.title,
                     body: action.payload.body
                 }
             }
             break
             case 'DEL_NOTE':
                 /* filter, pega todo menos o que quer deletar. index diferente do que quero deletar */
                 newList = newList.filter((item, index) => index != action.payload.key)
             break    
    }
    /* retorando a copia do state inteiro, e o list substituo por newList */
    return {...state, list: newList}
}