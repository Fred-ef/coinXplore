import PaginationButtonsCSS from './PaginationButtons.module.css';

export default function PaginationButtons({ page, maxPage, changePage }) {

    const maxButtonNum = (window.innerWidth >= 768) ? 9 : 3;
    const buttonNum = (maxPage < maxButtonNum) ? maxPage : maxButtonNum;
    let intervalStart = 0;
    let intervalEnd = 0;
    let pageIndexes = [];

    if(page <= Math.ceil(buttonNum/2)) {
        intervalStart = 1;
        intervalEnd = buttonNum;
    }
    else if(page >= (maxPage-Math.ceil(buttonNum/2))) {
        intervalStart = maxPage - buttonNum + 1;
        intervalEnd = maxPage;
    }
    else {
        intervalStart = parseInt(page) - parseInt(Math.floor(buttonNum/2));
        intervalEnd = parseInt(page) + parseInt(Math.floor(buttonNum/2));
    }

    for(let i=intervalStart; i<=intervalEnd; i++) pageIndexes.push(i);

    return(
        <div className={PaginationButtonsCSS.pagination}>
            <ul className={PaginationButtonsCSS.paginationRack}>
                <li key="prev">
                    <button className={(page > 1) ? PaginationButtonsCSS.pageItem : PaginationButtonsCSS.hidden} onClick={() => changePage(page - 1)}>&lt;</button>
                </li>

                <li key="first">
                    <button className={(intervalStart > 1) ? PaginationButtonsCSS.pageItem : PaginationButtonsCSS.hidden} onClick={() => changePage(1)}>1..</button>
                </li>

                {pageIndexes.map((value) => (
                        <li key={value}>
                            {page === value ? (
                                <p className={PaginationButtonsCSS.currPageItem}>{value}</p>
                            ) : (
                                <button className={PaginationButtonsCSS.pageItem} onClick={() => changePage(value)}>
                                    {value}
                                </button>
                            )}
                        </li>
                ))}

                <li key="last">
                    <button className={(intervalEnd < maxPage) ? PaginationButtonsCSS.pageItem : PaginationButtonsCSS.hidden} onClick={() => changePage(maxPage)}>..{maxPage}</button>
                </li>

                <li key="next">
                    <button className={(page < maxPage) ? PaginationButtonsCSS.pageItem : PaginationButtonsCSS.hidden} onClick={() => changePage(parseInt(page) + 1)}>&gt;</button>
                </li>
            </ul>
        </div>
    );
}