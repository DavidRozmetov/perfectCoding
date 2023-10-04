import React from "react";
import "../css/FreeRobux.css";
export const FreeRobux = () => {
  return (
    <div className="free-robux-container">
      <h2>
        How to Get Free <span className="span-yellow">60 Robux</span>
      </h2>
      <h3 className="sub-title">
        When we send you the Robux, it will take{" "}
        <span className="span-yellow">7-10 days</span> for you to receive it
      </h3>
      <div className="step">
        <h3>Step 1: Create a GamePass on Roblox</h3>
        <p>
          Watch the video below and follow the instructions until the end to
          learn how to create a GamePass on Roblox.
        </p>
        {/* Embedded YouTube video for creating a GamePass */}
      </div>

      <div className="step">
        <h3>Step 2: Join the Game "FeedTheArtists"</h3>
        <p>
          Watch the video tutorial below to learn how to join the game
          "FeedTheArtists" and create art connected to your GamePass ID. Set the
          price of your art to <span className="span-yellow"> 100 Robux</span>.
        </p>
        {/* Embedded YouTube video for joining the game and creating art */}
        <iframe
          className="youtube-video"
          src="https://www.youtube.com/embed/_DtTTLuBB88?si=i3y7LCivQiFzMiMU"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="step">
        <h3>Step 3: Add Teacher David on Roblox</h3>
        <p>
          Add Teacher David on Roblox by clicking the following link:{" "}
          <a
            href="https://www.roblox.com/users/2320300994/profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Teacher David's Roblox Profile
          </a>
          .
        </p>
      </div>

      <div className="step">
        <h3>Step 4: Notify Your School</h3>
        <p>
          Let your school know that you've completed the previous steps, and
          Teacher David will join the game to verify your progress.
        </p>
      </div>
    </div>
  );
};
