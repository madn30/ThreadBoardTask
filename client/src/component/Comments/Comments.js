import React, { useState } from 'react'
import { useColor, ColorPicker } from "react-color-palette";
import { ArrowBackIos, AddComment, ArrowDropUp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, updateComment } from "../../actions/threads"
import { ColorLens } from '@material-ui/icons';
import FirstComments from "../Comments/FirstComments"
import "./Comments.css"
export default function Comment({ location, history }) {

    const [isFirstComment, setIsFirstComment] = useState(false)
    const [opencolors, setOpenColors] = useState(false);
    const [backGroundColor, setBackGroundColor] = useColor("hex", "#ff7e7e");
    const [textComment, setTextComment] = useState("")
    const [isCollapseClicked, setIsCollapseClicked] = useState(false)
    const { thread: { color, _id: id, namethread, comments } } = location.state
    const [commentsLenght, setCommentsLenght] = useState(new Array(comments.length).fill(false))

    const dispatch = useDispatch();
    const threads = useSelector((state) => state.threads)
    var activThreadComment = threads?.find(i => i._id == id)?.comments;


    const onKeyEvent = (e) => {
        if (e.key === "Enter") {
            if (textComment.length) {
                setIsFirstComment(false)
                dispatch(addComment(id, { namecomment: textComment, colorcomment: backGroundColor.hex, parentId: id, which: "threadcomment" }));
            }
        }
    }

    const change = (e, index) => dispatch(updateComment(id, { index, name: e.target.textContent }));

    return (
        <div className="container_comments">
            <div className="backarrow_comments">
                <ArrowBackIos onClick={() => history.push("/")} />
            </div>
            <div style={{ padding: 10, backgroundColor: color }}>
                <div className="namethreadcomment">
                    <span >
                        {namethread}
                    </span>
                    <AddComment style={{ opacity: textComment.length ? 1 : 0.5 }} onClick={() => setIsFirstComment((cur) => !cur)} />
                    <ArrowDropUp onClick={() => setIsCollapseClicked(cur => !cur)} />
                </div>
                <div className={isCollapseClicked ? "collapse" : null}>
                    {isFirstComment &&
                        <div style={{ margin: "0 10px 30px 10px", padding: "5px", backgroundColor: backGroundColor.hex }}>
                            <ColorLens onClick={() => setOpenColors(current => !current)} />
                            <input type="text" onChange={(e) => setTextComment(e.target.value)} onKeyDown={onKeyEvent} placeholder="add comment" />
                            {opencolors &&
                                <div className="colorpicker">
                                    <ColorPicker width={456} height={228} color={backGroundColor} onChange={setBackGroundColor} hideHSV dark />
                                </div>}
                        </div>}
                    {activThreadComment?.map((comment, index) => (
                        <div className="displayelements" key={comment._id} style={{ backgroundColor: comment.colorcomment }}>
                            <span onBlur={(e) => change(e, index)} contentEditable="true" suppressContentEditableWarning={true}>
                                {comment.namecomment}
                            </span>
                            <AddComment onClick={() => { setCommentsLenght(commentsLenght.map((val, indexLength) => indexLength === index && !val)) }} />
                            <FirstComments id={comment._id} commentslenght={commentsLenght} index={index} firstcomments={comment.firstcomments} />
                        </div>))}
                </div>
            </div >
        </div>
    )
}
