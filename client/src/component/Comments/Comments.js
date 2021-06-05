import React, { useState } from 'react'
import { useColor, ColorPicker } from "react-color-palette";
import { ArrowBackIos, AddComment, ArrowDropUp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from "../../actions/threads"
import { ColorLens } from '@material-ui/icons';
import FirstComments from "../Comments/FirstComments"
import "./Comments.css"
export default function Comment({ location, history }) {

    const [isFirstComment, setIsFirstComment] = useState(false)
    const [opencolors, setOpenColors] = useState(false);
    const [backGroundColor, setBackGroundColor] = useColor("hex", "#ff7e7e");
    const [textComment, setTextComment] = useState("")
    const { thread: { color, _id: id, namethread, comments } } = location.state
    const [commentsLenght, setCommentsLenght] = useState(new Array(comments.length).fill(false))
    const dispatch = useDispatch();
    const threads = useSelector((state) => state.threads)
    var activThreadComment = threads?.find(i => i._id == id)?.comments;


    const onKeyEvent = (e) => {
        if (e.key === "Enter") {
            if (textComment.length) {
                setIsFirstComment(false)
                dispatch(updateComment(id, { namecomment: textComment, colorcomment: backGroundColor.hex, parentId: id, which: "threadcomment" }));
            }
        }
    }


    return (
        <div className="container">
            <div className="backarrow">
                <ArrowBackIos onClick={() => history.push("/")} className="icon" />
            </div>
            <div style={{ backgroundColor: color }}>
                <div style={{ display: 'flex', alignItems: "center", flexDirection: "center", justifyContent: "space-around" }}>
                    <span >
                        {namethread}
                    </span>
                    <AddComment style={{ opacity: textComment.length ? 1 : 0.5 }} onClick={() => setIsFirstComment((cur) => !cur)} />
                    <ArrowDropUp />
                </div>


                {isFirstComment &&

                    <div style={{ margin: "0 10px 30px 10px", padding: "5px", backgroundColor: backGroundColor.hex }}>
                        <ColorLens onClick={() => setOpenColors(current => !current)} className="icon" />
                        <input type="text" onChange={(e) => setTextComment(e.target.value)} onKeyDown={onKeyEvent} placeholder="add comment" />
                        {opencolors &&
                            <div className="colorpicker">
                                <ColorPicker width={456} height={228} color={backGroundColor} onChange={setBackGroundColor} hideHSV dark />

                            </div>
                        }
                        {/* <AddComment onClick={() => { setFirstComment((cur) => !cur) }} /> */}
                    </div>

                }
                {activThreadComment
                    ?.map((comment, index) => (
                        <div key={comment._id} style={{ margin: "0 10px 30px 10px", padding: "5px", backgroundColor: comment.colorcomment }}>
                            {comment.namecomment}
                            <AddComment onClick={() => {
                                setCommentsLenght(commentsLenght.map((val, indexLength) => indexLength === index && !val))
                            }} />

                            <FirstComments id={comment._id} commentslenght={commentsLenght} index={index} firstcomments={comment.firstcomments} />

                        </div>
                    ))
                }
            </div>
        </div >
    )
}
