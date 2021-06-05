import React, { useState } from 'react'
import { useColor, ColorPicker } from "react-color-palette";
import { ColorLens } from '@material-ui/icons';
import { AddComment } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from "../../actions/threads"
import "./Comments.css"
export default function FirstComments({ id, commentslenght, index, firstcomments }) {

    const [opencolors, setOpenColors] = useState(false);
    const [backGroundColor, setBackGroundColor] = useColor("hex", "#a46666");


    const dispatch = useDispatch();


    const onKeyEvent = (e) => {
        console.log(id);
        if (e.key === "Enter") {
            dispatch(updateComment(id, { namecomment: e.target.value, colorcomment: backGroundColor.hex, which: "firstcomment" }));
        }
    }

    return (
        <div>
            {commentslenght[index] &&

                <div className="addsubcomment" style={{ backgroundColor: backGroundColor.hex }}>
                    <ColorLens onClick={() => setOpenColors(current => !current)} className="icon" />
                    <input type="text" onKeyDown={onKeyEvent} placeholder="add comment" />
                    {opencolors &&
                        <div className="colorpicker">
                            <ColorPicker width={456} height={228} color={backGroundColor} onChange={setBackGroundColor} hideHSV dark />

                        </div>
                    }
                </div>

            }
            {firstcomments?.map(first => (
                <div style={{ wordWrap: "break-word", backgroundColor: first.colorcomment, margin: "20px 30px 20px 20px" }}>
                    <span>
                        {first.namecomment}
                    </span>
                </div>
            ))
            }
        </div >
    )
}
