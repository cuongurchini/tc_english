import { SyncOutlined } from "@ant-design/icons";
import { Card, Col, FloatButton, Row } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import "./cardGrid.s.scss";

interface Word {
  word: string;
  meaning: string;
}

interface CardCarouselProps {
  wordList: Word[];
}

const CardGrid = (props: CardCarouselProps) => {
  const { wordList } = props;

  const [showMeaningItems, setShowMeaningItems] = useState<string[]>([]);

  const handleShuffleWordList = () => {
    const shuffledWordList = _.shuffle(wordList);
    const clonedShowMeaningItems: string[] = [];
    _.forEach(shuffledWordList, (word: Word, index: number) => {
      if (index % 2 === 0) {
        clonedShowMeaningItems.push(word.word);
      }
    });
    setShowMeaningItems(clonedShowMeaningItems);
  };

  const handleCardPress = (word: string) => {
    if (!_.includes(showMeaningItems, word)) {
      setShowMeaningItems([...showMeaningItems, word]);
    } else {
      const newShowMeaningItems = _.filter(
        showMeaningItems,
        (item: string) => item !== word
      );
      setShowMeaningItems(newShowMeaningItems);
    }
  };

  useEffect(() => {
    handleShuffleWordList();
  }, []);

  return (
    <>
      <FloatButton.Group shape="square" style={{ right: 16 }}>
        <FloatButton icon={<SyncOutlined />} onClick={handleShuffleWordList} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <Row
        gutter={16}
        style={{
          marginLeft: 0,
          marginRight: 0,
          padding: "8px 16px",
        }}
      >
        {_.map(props.wordList, (word: Word) => (
          <Col
            md={8}
            xs={24}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingBlock: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {_.includes(showMeaningItems, word.word) ? (
              <Card
                onClick={() => {
                  handleCardPress(word.word);
                }}
                className="card card--show-meaning"
              >
                <span>{word.meaning}</span>
              </Card>
            ) : (
              <Card
                onClick={() => {
                  handleCardPress(word.word);
                }}
                className="card"
              >
                <span>{word.word}</span>
              </Card>
            )}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CardGrid;
