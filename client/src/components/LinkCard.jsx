import React from "react"
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../contex/AuthContex";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useMessage} from "../hooks/message.hook";


export const LinkCard = ({link}) => {
    const history = useHistory()
    const {token} = React.useContext(AuthContext)
    const {loading, request} = useHttp()
    const linkId = useParams().id
    const message = useMessage()




    const deleteLink = React.useCallback(async () => {
        try {
            await request(`/api/link/${linkId}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            message("Ссылка была удалена")
            history.push('/links')
        } catch(e) {}
    },[token, history, linkId, request] )

    if(loading) {
        return <Loader/>
    }

    return (
        <>
            <h2>Ссылка</h2>
            <p>Ваша ссылка: <a href={link.to} target={"_blank"} rel={"noopener noreferrer"}>{link.to}</a></p>
            <p>Откуда: <a href={link.from} target={"_blank"} rel={"noopener noreferrer"}>{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong> </p>
            <p>Дата создания: <strong>{new Date(link.data).toLocaleDateString()} </strong></p>
            <button className="blue darken-1 btn-large" onClick={deleteLink}>Удалить</button>
        </>
    )
}