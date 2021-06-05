import React, { useState } from 'react'
import "./AddThread.css"
import { AddComment, ArrowBackIos, ColorLens } from '@material-ui/icons';
import { ColorPicker, useColor } from "react-color-palette";
import { createThread } from '../../actions/threads';
import { useDispatch } from 'react-redux';
import "react-color-palette/lib/css/styles.css";

function AddTread({ history }) {
    const [opencolors, setOpenColors] = useState(false);
    const [namethread, setNameThread] = useState("");
    const [color, setColor] = useColor("hex", "#ffffff");
    const dispatch = useDispatch();

    const Postthread = () => {
        dispatch(createThread({ namethread, color: color.hex }));
        history.push("/")
    }

    return (
        <div className="container">
            <div className="backarrow">
                <ArrowBackIos onClick={() => history.push("/")} className="backarrow" />
            </div>
            <div className="addthread" style={{ filter: "invert(1)", backgroundColor: color.hex }}>
                <ColorLens onClick={() => setOpenColors(current => !current)} className="icon" />
                {opencolors &&
                    <div className="colorpicker">
                        <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
                    </div>
                }
                <input onChange={(e) => setNameThread(e.target.value)} type="text" placeholder="name thread" />
                <AddComment onClick={Postthread} className={namethread.length < 1 && "emptyinput"} />
            </div>
        </div>
    )
}

export default AddTread
