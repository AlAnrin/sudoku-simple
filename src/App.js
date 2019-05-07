import React from 'react';
import './App.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon } from '@mdi/react';
import {mdiEraserVariant} from '@mdi/js';

function App() {
    const [selectIndexs, setSelIndexs] = React.useState([-1, -1]);
    const [selectLevel, setSelectLevel] = React.useState(3);
    const [levels] = React.useState([{text: 'Простой', id: 3}, {text: 'Средний', id: 5}, {text: 'Сложный', id: 8}]);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [menuOptions] = React.useState([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const [rows, setRows] = React.useState(sudokuRender(3));
    const [isWin, setIsWin] = React.useState(false);
    const [checkErrors, setCheckErr] = React.useState(false);

    function sudokuRender(level_id) {
        let rows = [];
        let field = '';
        switch (level_id){
            case 3: field = '0681594327597283416342671589934157268278936145156842973729318654813465792465729831';
            break;
            case 5: field = '0937162845862754319451893267274519638615438972398276451786321594123945786549687123';
            break;
            case 8: field = '0473896152518427936926351487692514378185673294347289561761945823854732619239168745';
        }
        let arr = [1,2,3,4,6,7,5,8,9].sort(() => {return Math.random() - 0.5});
        let row = [];
        for (let i = 1; i < 82; i++) {
            if (i % 9 === 1) row = [];
            Math.random()*10 > level_id
                ?
                row.push({text: +arr[field.substr(i,1)-1], num: i - 1, cantChange: true})
                    :
                row.push({text: '', num: i - 1, cantChange: false});
            if (i % 9 === 0) {
                rows.push(row);
            }
        }
        return rows;
    }

    function handleOpen(e, indexRow, indexCell) {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
        setSelIndexs([indexRow, indexCell]);
    }

    function changeLevel(level_id) {
        setSelectLevel(level_id);
        setRows(sudokuRender(level_id));
        setCheckErr(false);
    }

    function handleClose(item) {
        if (item !== null) {
            let newRows = Object.assign([], rows);
            newRows[selectIndexs[0]][selectIndexs[1]].text = item !== -1 ? item : '';
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
        let errors = false;
        rows.map(row => {
            let uniqueRow = unique(row);
            if (uniqueRow.length !== row.length)
                flag = false;
            if (uniqueRow.length !== row.filter(item => item.text !== '').length)
                errors = true;
            return row;
        });
        for (let i = 0; i < 9; i++) {
            let col = [];
            for (let j = 0; j < 9; j++) {
                col.push(rows[j][i]);
            }
            let uniqueCol = unique(col);
            if (uniqueCol.length !== col.length)
                flag = false;
            if (uniqueCol.length !== col.filter(item => item.text !== '').length)
                errors = true;
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
            let uniqueSquare = unique(square);
            if (uniqueSquare.length !== square.length)
                flag = false;
            if (uniqueSquare.length !== square.filter(item => item.text !== '').length)
                errors = true;
        });
        if (flag) setIsWin(true);
        setCheckErr(errors);
    }

    function playAgain() {
        setIsWin(false);
        setRows(sudokuRender(3));
        setCheckErr(false);
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
                            <button className={level.id === selectLevel ? 'selectLevelBtn niceBtn' : 'niceBtn'} key={level.id}
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
                            <div className={checkErrors ? 'errorTable' : 'table'}>
                                { div }
                            </div>
                            <Menu
                                id="menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={() => handleClose(null)}
                            >
                                <div>
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
                                    <button className="iconEraserBtn" onClick={() => handleClose(-1)}>
                                        <Icon className="iconEraser" path={mdiEraserVariant}/>
                                    </button>
                                </div>
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
