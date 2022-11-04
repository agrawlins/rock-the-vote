import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        issues: [],
        errMsg: ""
    }
    const initCommentState = {
        comments: [],
        errMsg: ""
    }
    const [userState, setUserState] = useState(initState)
    const [commentState, setCommentState] = useState(initCommentState)
    const signup = (credentials) => {
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = (credentials) => {
        axios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: "",
            issues: []
        })
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    const getIssues= () => {
        userAxios.get('/api/issues/')
            .then(res => {
                console.log(res.data)
                setUserState(prevState => ({
                    ...prevState,
                    issues: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    const addIssue = (newIssue) => {
        userAxios.post("/api/issues", newIssue)
            .then(res => {
                getIssues()
                setUserState(prevState => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    const upvoteIssue = (_id, upvote) => {
        userAxios.put(`/api/issues/upvote/:issueId`, upvote)
        .then(res => {
            console.log(upvote, "upvote")
            getIssues()
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const downvoteIssue = (_id, downvote) => {
        userAxios.put(`/api/issues/downvote/:issueId`, downvote)
        .then(res => {
            console.log(downvote, "downvote")
            getIssues()
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const upvoteComment = (_id, upvote) => {
        userAxios.put(`/api/issues/upvote/:issueId`, upvote)
        .then(res => {
            console.log(upvote, "upvote")
            getIssues()
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const downvoteComment = (_id, downvote) => {
        userAxios.put(`/api/issues/downvote/:issueId`, downvote)
        .then(res => {
            console.log(downvote, "downvote")
            getIssues()
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getComments= () => {
        userAxios.get('/api/comments/')
            .then(res => {
                setCommentState(prevState => ({
                    ...prevState,
                    comments: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    const addComment = (newComment) => {
        userAxios.post("/api/comments", newComment)
            .then(res => {
                getComments()
                setCommentState(prevState => ({
                    ...prevState,
                    comments: [res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        getIssues()
        getComments()
    }, [])

    return (
        <UserContext.Provider
            value={{
                ...userState,
                ...commentState,
                signup,
                login,
                logout,
                addIssue,
                upvoteIssue,
                downvoteIssue,
                upvoteComment,
                downvoteComment,
                addComment,
                resetAuthErr  
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider