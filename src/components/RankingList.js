import React from "react";
import web3 from "web3";
import { connect } from "react-redux";
import { List, Label, Icon, Button, Popup } from "semantic-ui-react";
import { toggleList } from "../actions/web3Actions";

const RankingList = ({ top10List, onToggleList, fullList }) => {
  return (
    <div>
      <List celled size="small">
        <List.Item key={999}>
          <List.Content>
            <Label position="left" color="brown" size="large">
              Ranking List!
            </Label>
            <Popup
              trigger={
                <Button
                  size="mini"
                  color={fullList ? "yellow" : "grey"}
                  toggle
                  icon={fullList ? "add" : "remove"}
                  onClick={onToggleList}
                />
              }
              content={fullList ? "Ver ranking completo" : "Ver top 10"}
            />
          </List.Content>
        </List.Item>
      </List>
      <List celled size="tiny">
        {top10List.map((item, index) => {
          let showIcon;
          if (index >= 0 && index <= 2) {
            showIcon = <Icon name="gift" color="yellow" />;
          } else {
            showIcon = null;
          }
          return (
            <List.Item key={index}>
              <List.Content floated="left">
                <Label color="grey" circular size="big">
                  {index + 1}
                </Label>
              </List.Content>
              <List.Content>
                <List.Header>
                  {item.name} {showIcon}{" "}
                </List.Header>
                <List.Header>
                  Intentos: {item.attemps} - Tiempo: {item.time} segundos
                </List.Header>
                {item.mail}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    fullList: state.web3Reducer.fullList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleList: () => {
      dispatch(toggleList());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);
