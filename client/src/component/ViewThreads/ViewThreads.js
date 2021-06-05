import React from 'react'
import { ChevronRight } from '@material-ui/icons';
import { Link } from "react-router-dom"

export default function ViewThreads({ thread, history }) {
    return (
        <div >
            <li className="allthreads" style={{ backgroundColor: thread.color }} >
                <span className="inherite">
                    {thread.namethread}
                </span>
                <Link to={{ pathname: "/comment", state: { thread } }}>
                    <ChevronRight className="continue" />
                </Link>
            </li>
        </div>
    )
}
