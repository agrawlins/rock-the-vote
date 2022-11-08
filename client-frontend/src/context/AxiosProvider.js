import React, {useEffect, useState, createContext} from 'react'
import axios from "axios"

export const AxiosContext = React.createContext()

export const appAxios = axios.create()
appAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const AxiosProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        issues: [],
        errMsg: ""
    }
    const initIssueState = {
        comments: [],
        errMsg: ""
    }
    const initCommentState = {
        comments: [],
        errMsg: ""
    }
    const [issueState, setIssueState] = useState(initIssueState)
    const [commentState, setCommentState] = useState(initCommentState)
    const getIssues= () => {
        appAxios.get('/api/issues/')
            .then(res => {
                console.log(res.data)
                setIssueState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    
    const addIssue = (newIssue) => {
        appAxios.post("/api/issues", newIssue)
            .then(res => {
                getIssues()
                setIssueState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    
    const upvoteIssue = (_id, upvote) => {
        appAxios.put(`/api/issues/upvote/:issueId`, upvote)
        .then(res => {
            console.log(upvote, "upvote")
            getIssues()
            setIssueState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    const downvoteIssue = (_id, downvote) => {
        appAxios.put(`/api/issues/downvote/:issueId`, downvote)
        .then(res => {
            console.log(downvote, "downvote")
            getIssues()
            setIssueState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    const upvoteComment = (_id, upvote) => {
        appAxios.put(`/api/issues/upvote/:issueId`, upvote)
        .then(res => {
            console.log(upvote, "upvote")
            getIssues()
            setCommentState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    const downvoteComment = (_id, downvote) => {
        appAxios.put(`/api/issues/downvote/:issueId`, downvote)
        .then(res => {
            console.log(downvote, "downvote")
            getIssues()
            setCommentState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // const getComments= () => {
    //     appAxios.get('/api/comments/')
    //         .then(res => {
    //             setCommentState(prevState => ({
    //                 ...prevState,
    //                 comments: res.data
    //             }))
    //         })
    //         .catch(err => console.log(err.response.data.errMsg))
    // }
    
    const getCommentsByIssueId= (_id) => {
        appAxios.get(`/api/comments/${_id}`)
            .then(res => {
                setCommentState(prevState => ({
                    ...prevState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    
    const addComment = (newComment) => {
        appAxios.post(`/api/comments/:issueId`, newComment)
            .then(res => {
                // getComments()
                // getCommentsByIssueId()
                setCommentState(prevState => ({
                    ...prevState,
                    comments: [res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }
    
    // const addComment = (issue, newComment) => {
    //     appAxios.post(`/api/comments/${issue._id}`, newComment)
    //         .then(res => {
    //             // getComments()
    //             getCommentsByIssueId()
    //             setCommentState(prevState => ({
    //                 ...prevState,
    //                 comments: [res.data]
    //             }))
    //         })
    //         .catch(err => console.log(err.response.data.errMsg))
    // }
    
    useEffect(() => {
        getIssues()
        // getComments()
    }, [])
    
    return (
        <AxiosContext.Provider
            value={{
                // userAxios,
                // ...userState,
                ...commentState,
                // signup,
                // login,
                // logout,
                addIssue,
                upvoteIssue,
                downvoteIssue,
                upvoteComment,
                downvoteComment,
                addComment,
                getCommentsByIssueId,
                // resetAuthErr  
            }}>
            {props.children}
        </AxiosContext.Provider>
    )
}


export default AxiosProvider