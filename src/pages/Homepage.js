import React, { useState, useEffect } from 'react';
import Search from "../components/Search";
import Picture from "../components/Picture";


const Homepage = () => {
    const [input, setInput] = useState("");
    let [data, setData] = useState(null);
    let [page, setPage] = useState(1);
    const auth = "563492ad6f91700001000001d685967ab07d4b5f888e9928be0a7c9a";
    const intiURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15`;

    //  fetch data from pexels api 
    const search = async (url) => {
        setPage(2);
        const dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },
        });
        let parsedDate = await dataFetch.json();
        setData(parsedDate.photos);
    };

    //Load more picture
    const morepicture = async () => {
        let newURL;
        if (input === "") {
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
        } else newURL = `https://api.pexels.com/v1/search?query=${input}&per_page=${page}`;
        setPage(page + 1);
        const dataFetch = await fetch(newURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },
        });
        let parsedDate = await dataFetch.json();
        setData(data.concat(parsedDate.photos));
    }

    // fetch data when the page loads up
    useEffect(() => {
        search(intiURL);
    }, []);


    return (
        <div style={{ minHeight: "100vh" }}>
            <Search
                search={() => {
                    search(searchURL);
                }}
                setInput={setInput}
            />
            <div className="pictures">
                {data &&
                    data.map((d) => {
                        return <Picture data={d} />;
                    })}
            </div>

            <div className="morePicture">
                <button onClick={morepicture}>Load More</button>
            </div>
        </div>
    );
};

export default Homepage;

