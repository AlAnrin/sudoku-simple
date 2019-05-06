import React, {Component} from 'react';
import './App.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function App() {
    const [rows, setRows] = React.useState(sudokuRender(0));
    const [selectLevel, setSelectLevel] = React.useState(0);
    const [levels] = React.useState([{text: 'Простой', id: 0}, {text: 'Средний', id: 1}, {text: 'Сложный', id: 2}]);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    function sudokuRender(level) {
        let rows = [];
        if (level === 0) {
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
                    firstRow.map(item => {return {text: item, num: item - 1, cantChange: false, zero_text: item}})
                ];
        }

        return rows;
    }

    function handleClick(e, indexRow, indexCell) {
        console.log(indexCell);
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    function changeLevel(level_id) {
        let rows = sudokuRender(level_id);
        setSelectLevel(level_id);
        setRows(rows);
    }

    function handleClose() {
        setOpenMenu(false);
        setAnchorEl(null);
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
                        onClick={(e) => handleClick(e, indexRow, indexCell)}>
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
                <header className="App-header">
                    { div }
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                    >
                        <div className="row">
                            <MenuItem onClick={handleClose}>1</MenuItem>
                            <MenuItem onClick={handleClose}>2</MenuItem>
                            <MenuItem onClick={handleClose}>3</MenuItem>
                        </div>
                        <div className="row">
                            <MenuItem onClick={handleClose}>4</MenuItem>
                            <MenuItem onClick={handleClose}>5</MenuItem>
                            <MenuItem onClick={handleClose}>6</MenuItem>
                        </div>
                        <div className="row">
                            <MenuItem onClick={handleClose}>7</MenuItem>
                            <MenuItem onClick={handleClose}>8</MenuItem>
                            <MenuItem onClick={handleClose}>9</MenuItem>
                        </div>
                        {/*{menuOptions.map(option => (*/}
                            {/*<MenuItem key={option} onClick={handleClose}>*/}
                                {/*{option}*/}
                            {/*</MenuItem>*/}
                        {/*))}*/}
                    </Menu>
                    <div className="border vertical left"/>
                    <div className="border vertical right"/>
                    <div className="border horizontal top"/>
                    <div className="border horizontal bottom"/>
                </header>
            </div>
        )
    }

    return render();
}

export default App;
