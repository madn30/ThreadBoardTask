import React, { useState } from 'react'
import { useColor, ColorPicker } from "react-color-palette";
import { ColorLens } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { addComment } from "../../actions/threads"
import "./Comments.css"
export default function FirstComments({ id, commentslenght, index, firstcomments }) {

    const [opencolors, setOpenColors] = useState(false);
    const [backGroundColor, setBackGroundColor] = useColor("hex", "#a46666");

    const dispatch = useDispatch();

    const onKeyEvent = (e) => {
        if (e.key === "Enter") dispatch(addComment(id, { namecomment: e.target.value, colorcomment: backGroundColor.hex, which: "firstcomment" }));
    }

    return (
        <div>
            {commentslenght[index] &&
                <div className="addsubcomment" style={{ backgroundColor: backGroundColor.hex }}>
                    <ColorLens onClick={() => setOpenColors(current => !current)} />
                    <input type="text" onKeyDown={onKeyEvent} placeholder="add comment" />
                    {opencolors &&
                        <div className="colorpicker">
                            <ColorPicker width={456} height={228} color={backGroundColor} onChange={setBackGroundColor} hideHSV dark />
                        </div>
                    }
                </div>

            }
            {firstcomments?.map(first => (
                <div key={first._id} style={{ wordWrap: "break-word", backgroundColor: first.colorcomment, margin: "20px 30px 20px 20px" }}>
                    <span className="inherite">
                        {first.namecomment}
                    </span>
                </div>
            ))}
        </div>
    )
}
