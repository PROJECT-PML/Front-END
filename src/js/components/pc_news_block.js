import React from 'react';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Pagination } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router';

export default class PCNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.props.count, myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({ news: json }));
    }
    render() {
        const { news } = this.state;
            const newsList = news.length
            ?
            news.map((newsItem, index) => (
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        {newsItem.title}
                    </Link>
                </li>
            ))
            :
            '没有加载到任何新闻！';

        return (
            

        <div class="topNewsList">
            <Card>
                <ul>
                    {newsList}
                </ul>
            </Card>
            <Pagination defaultCurrent={1} total={30}  />
        </div>
        );
    };
}