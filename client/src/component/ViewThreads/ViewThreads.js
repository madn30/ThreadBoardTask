import React from 'react'
import { ChevronRight } from '@material-ui/icons';
import { Link } from "react-router-dom"
import "./ViewThreads.css"

export default function ViewThreads({ thread, history }) {

    return (
        <li className="allthreads_View" style={{ backgroundColor: thread.color }} >
            <span className="inherite">
                {thread.namethread}
            </span>
            <Link to={{ pathname: "/comment", state: { thread } }}>
                <ChevronRight className="continue" />
            </Link>
        </li>
    )
}
