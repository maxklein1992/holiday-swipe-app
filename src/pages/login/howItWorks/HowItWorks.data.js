import inviteIcon from "../../../assets/icons/invite.png";
import selectIcon from "../../../assets/icons/select.png";
import heartIcon from "../../../assets/icons/heart.png";
import trophyIcon from "../../../assets/icons/trophy.png";
import rankingIcon from "../../../assets/icons/ranking.png";

export const data = {
  steps: [
    {
      title: "Select type of holiday",
      description: "Select the type of holiday you want to have",
      icon: selectIcon,
    },
    {
      title: "Invite travel buddy",
      description: "Add the person you want to go on holiday with",
      icon: inviteIcon,
    },
    {
      title: "Like destinations",
      description: "Explore destinations and give a like or dislike",
      icon: heartIcon,
    },
    {
      title: "Make a top 5",
      description:
        "From the destinations you and your travel buddy like, make a top 5",
      icon: rankingIcon,
    },
    {
      title: "Winner",
      description:
        "A winner! We found a location you and your travel buddy like the most.",
      icon: trophyIcon,
    },
  ],
};
