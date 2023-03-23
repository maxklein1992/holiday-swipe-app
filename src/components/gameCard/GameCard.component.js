import React from "react";
import findIndex from "lodash.findindex";

import styles from "./GameCard.module.scss";

const GameCard = ({ game, userInfo, onClick, gameStatus }) => {
  const userHasSwiped = () => {
    if (gameStatus === "both_first" || gameStatus === "user_first") {
      return false;
    } else {
      return true;
    }
  };

  const userHasSelectedFavourites = () => {
    if (gameStatus === "finished" || gameStatus === "opponent_second") {
      return true;
    } else {
      return false;
    }
  };

  const opponentHasSelectedFavourites = () => {
    if (gameStatus === "finished" || gameStatus === "user_second") {
      return true;
    } else {
      return false;
    }
  };

  const opponentHasSwiped = () => {
    if (gameStatus === "both_first" || gameStatus === "opponent_first") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <button
      className={[
        styles.component,
        gameStatus === "finished"
          ? styles.isBlue
          : userHasSwiped() && opponentHasSwiped() && styles.isGreen,
      ].join(" ")}
      onClick={onClick}
    >
      <div className={styles.upperPart}>
        <img
          className={styles.image}
          src="https://cdn-icons-png.flaticon.com/512/197/197615.png"
        />
        <p
          className={[
            styles.title,
            gameStatus === "finished" && styles.isWhite,
          ].join(" ")}
        >
          {gameStatus === "finished"
            ? "See winner now"
            : gameStatus === "both_second"
            ? "Click to see results"
            : "Countries in Europe"}
        </p>
      </div>
      <div className={styles.lowerPart}>
        {game.participants.map((participant) => {
          const isUser = participant.email === userInfo.email;

          const playerHasSelectedFavourites =
            (isUser && userHasSelectedFavourites()) ||
            (!isUser && opponentHasSelectedFavourites());

          const playerHasSwiped =
            (isUser && userHasSwiped()) || (!isUser && opponentHasSwiped());

          return (
            <div
              className={[
                styles.participantContainer,
                gameStatus === "finished" && styles.isFinished,
              ].join(" ")}
              key={`key ${participant.email}`}
            >
              <p
                className={[
                  styles.participantTitle,
                  gameStatus === "finished" && styles.isWhite,
                ].join(" ")}
              >
                {isUser ? "you" : participant.email}
              </p>
              {gameStatus !== "finished" && (
                <p
                  className={[
                    styles.participantAction,
                    playerHasSelectedFavourites
                      ? styles.isBlue
                      : userHasSwiped() && opponentHasSwiped()
                      ? styles.isWhite
                      : playerHasSwiped && styles.isGreen,
                  ].join(" ")}
                >
                  {playerHasSelectedFavourites
                    ? "has selected favourites"
                    : playerHasSwiped
                    ? "swiped"
                    : "not yet swiped"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </button>
  );
};

export default GameCard;
