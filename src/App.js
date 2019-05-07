import React from 'react';
import './App.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function App() {
    const [selectIndexs, setSelIndexs] = React.useState([-1, -1]);
    const [selectLevel, setSelectLevel] = React.useState(0);
    const [levels] = React.useState([{text: 'Простой', id: 0}, {text: 'Средний', id: 1}, {text: 'Сложный', id: 2}]);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuOptions] = React.useState([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const [rows, setRows] = React.useState(sudokuRender(0));
    const [isWin, setIsWin] = React.useState(false);

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    function sudokuRender() {
        let rows = [];
        if (selectLevel === 0) {
            let firstRow = [], numb = 0;
            for (let i = 0; i < 9; i++) {
                while (firstRow.indexOf(numb) === -1)
                {
                    numb = randomInteger(1, 9);
                    if (firstRow.indexOf(numb) === -1) {
                        firstRow.push(numb);
                    }
                    else numb = 0;
                }
                numb = 0;
            }
            rows =
                [
                    // firstRow.map(item => {return {text: item, num: item - 1, cantChange: false, zero_text: item}})
                    [
                        {text: 5, num: 0, cantChange: true},
                        {text: 9, num: 1, cantChange: true},
                        {text: 3, num: 2, cantChange: true},
                        {text: 1, num: 3, cantChange: false},
                        {text: 8, num: 4, cantChange: true},
                        {text: 7, num: 5, cantChange: true},
                        {text: 6, num: 6, cantChange: true},
                        {text: 2, num: 7, cantChange: true},
                        {text: 4, num: 8, cantChange: false},
                    ],
                    [
                        {text: 7, num: 9, cantChange: true},
                        {text: 6, num: 10, cantChange: false},
                        {text: 4, num: 11, cantChange: true},
                        {text: 9, num: 12, cantChange: false},
                        {text: 3, num: 13, cantChange: false},
                        {text: 2, num: 14, cantChange: true},
                        {text: 8, num: 15, cantChange: false},
                        {text: 1, num: 16, cantChange: true},
                        {text: '', num: 17, cantChange: false, zero_text: 5},
                    ],
                    [
                        {text: 1, num: 18, cantChange: false},
                        {text: 8, num: 19, cantChange: true},
                        {text: 2, num: 20, cantChange: false},
                        {text: 6, num: 21, cantChange: true},
                        {text: 5, num: 22, cantChange: true},
                        {text: 4, num: 23, cantChange: true},
                        {text: 9, num: 24, cantChange: true},
                        {text: 3, num: 25, cantChange: true},
                        {text: 7, num: 26, cantChange: false},
                    ],
                    [
                        {text: 2, num: 27, cantChange: true},
                        {text: 1, num: 28, cantChange: false},
                        {text: 5, num: 29, cantChange: true},
                        {text: 3, num: 30, cantChange: true},
                        {text: 4, num: 31, cantChange: true},
                        {text: 8, num: 32, cantChange: true},
                        {text: 7, num: 33, cantChange: false},
                        {text: 9, num: 34, cantChange: true},
                        {text: 6, num: 35, cantChange: false},
                    ],
                    [
                        {text: 4, num: 36, cantChange: true},
                        {text: 7, num: 37, cantChange: false},
                        {text: 6, num: 38, cantChange: true},
                        {text: 5, num: 39, cantChange: true},
                        {text: 1, num: 40, cantChange: false},
                        {text: 9, num: 41, cantChange: false},
                        {text: 3, num: 42, cantChange: false},
                        {text: 8, num: 43, cantChange: true},
                        {text: 2, num: 44, cantChange: true},
                    ],
                    [
                        {text: 9, num: 45, cantChange: true},
                        {text: 3, num: 46, cantChange: true},
                        {text: 8, num: 47, cantChange: true},
                        {text: 7, num: 48, cantChange: false},
                        {text: 2, num: 49, cantChange: true},
                        {text: 6, num: 50, cantChange: false},
                        {text: 4, num: 51, cantChange: true},
                        {text: 5, num: 52, cantChange: true},
                        {text: 1, num: 53, cantChange: true},
                    ],
                    [
                        {text: 6, num: 54, cantChange: true},
                        {text: 2, num: 55, cantChange: false},
                        {text: 7, num: 56, cantChange: true},
                        {text: 8, num: 57, cantChange: true},
                        {text: 9, num: 58, cantChange: true},
                        {text: 1, num: 59, cantChange: true},
                        {text: 5, num: 60, cantChange: true},
                        {text: 4, num: 61, cantChange: false},
                        {text: 3, num: 62, cantChange: true},
                    ],
                    [
                        {text: 8, num: 63, cantChange: true},
                        {text: 5, num: 64, cantChange: true},
                        {text: 1, num: 65, cantChange: false},
                        {text: 4, num: 66, cantChange: true},
                        {text: 6, num: 67, cantChange: true},
                        {text: 3, num: 68, cantChange: false},
                        {text: 2, num: 69, cantChange: true},
                        {text: 7, num: 70, cantChange: true},
                        {text: 9, num: 71, cantChange: false},
                    ],
                    [
                        {text: 3, num: 72, cantChange: true},
                        {text: 4, num: 73, cantChange: true},
                        {text: 9, num: 74, cantChange: true},
                        {text: 2, num: 75, cantChange: false},
                        {text: 7, num: 76, cantChange: true},
                        {text: 5, num: 77, cantChange: false},
                        {text: 1, num: 78, cantChange: false},
                        {text: 6, num: 79, cantChange: true},
                        {text: '', num: 80, cantChange: false, zero_text: 8},
                    ],
                ];
        }

        return rows;
    }

    function handleOpen(e, indexRow, indexCell) {
        console.log(indexCell);
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
        setSelIndexs([indexRow, indexCell]);
    }

    function changeLevel(level_id) {
        let rows = sudokuRender();
        setSelectLevel(level_id);
        setRows(rows);
    }

    function handleClose(item) {
        if (item != null) {
            let newRows = Object.assign([], rows);
            newRows[selectIndexs[0]][selectIndexs[1]].text = item;
            setRows(newRows);
        }
        setOpenMenu(false);
        setAnchorEl(null);
        checkWin();
    }

    function unique(arr) {
        let obj = {};

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].text !== '') {
                let str = arr[i].text;
                obj[str] = true;
            }
        }

        return Object.keys(obj);
    }

    function checkWin() {
        let flag = true;
        rows.map(row => {
            if (unique(row).length !== row.length)
                flag = false;
            return row;
        });
        for (let i = 0; i < 9; i++) {
            let col = [];
            for (let j = 0; j < 9; j++) {
                col.push(rows[j][i]);
            }
            if (unique(col).length !== col.length) {
                flag = false;
                break;
            }
        }
        let indexes = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]];
        let indR = 0, indC = 0;
        indexes.forEach(ind => {
            [indR, indC] = ind;
            let square = [];
            for (let i = indR; i < indR + 3; i++) {
                for (let j = indC; j < indC + 3; j++) {
                    square.push(rows[i][j]);
                }
            }
            if (unique(square).length !== square.length) {
                flag = false;
            }
        });
        if (flag) setIsWin(true);
    }

    function playAgain() {
        setIsWin(false);
        setRows(sudokuRender());
    }

    function render() {
        let div = [], rowHtml = [];
        rows.forEach((row, indexRow) => {
            row.forEach((cell, indexCell) => {
                rowHtml.push(
                    <button id={`btn_${cell.num}`} key={cell.num} className="num_button card box"
                            disabled={cell.cantChange}
                            aria-owns={anchorEl ? 'menu' : undefined}
                            aria-haspopup="true"
                            onClick={(e) => handleOpen(e, indexRow, indexCell)}>
                        {cell.text}
                    </button>
                );
            });
            div.push(<div className="row" key={indexRow}>{rowHtml}</div>);
            rowHtml = [];
        });
        return (
            <div className="App">
                <div className="levelsHeader">
                    {
                        levels.map(level =>
                            <button className="niceBtn" key={level.id}
                                    onClick={() => changeLevel(level.id)}>
                                {level.text}
                            </button>
                        )
                    }
                </div>
                {
                    isWin ?
                        <header className="App-header">
                            YOU WIN!
                            <button className="niceBtn" onClick={playAgain}>PLAY AGAIN</button>
                        </header>
                        :
                        <header className="App-header">
                            { div }
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={() => handleClose(null)}
                            >
                                {
                                    menuOptions.map(row =>
                                        <div className="row" key={row}>
                                            {
                                                row.map(item => <MenuItem key={item}
                                                                          onClick={() => handleClose(item)}>{item}</MenuItem>)
                                            }
                                        </div>
                                    )
                                }
                            </Menu>
                            <div className="border vertical left"/>
                            <div className="border vertical right"/>
                            <div className="border horizontal top"/>
                            <div className="border horizontal bottom"/>
                        </header>
                }
            </div>
        )
    }

    return render();
}

export default App;
