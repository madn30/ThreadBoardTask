import React, { useEffect } from 'react'
import "./MainPage.css"
import { useSelector } from 'react-redux';
import ViewThreads from "../ViewThreads/ViewThreads"

function MainPage({ history }) {

    const threads = useSelector((state) => state.threads)
    return (
        <div className="container">
            <div className="thread">
                <div>
                    <span>Threads</span>
                </div>
                <div>
                    <button onClick={() => history.push("/AddThread")}>+</button><br />
                </div>
            </div>

            {threads?.map(thread => (<ViewThreads thread={thread} key={thread._id} />))}
        </div>
    )
}

export default MainPage
