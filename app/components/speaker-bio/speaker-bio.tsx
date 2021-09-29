import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { SocialButton } from "../social-button/social-button"
import { getScreenWidth, palette, spacing } from "../../theme"
import { Speaker } from "../../models"
import { SocialButtonPresetNames } from "../social-button/social-button.presets"

const ROOT: ViewStyle = {
  marginTop: spacing.extraLarge + spacing.large,
}

const BIO: TextStyle = {
  color: palette.offWhite,
  marginTop: spacing.large,
}

const SOCIAL_WRAPPER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  marginTop: spacing.large,
  flexWrap: "wrap",
}

const SOCIAL_WRAPPER_LAST: ViewStyle = {
  marginBottom: spacing.ginormous + spacing.large,
}

type RenderLinkProps = { k: SocialButtonPresetNames; link: string }

const RenderLink = ({ k, link }: RenderLinkProps) => {
  if (!link) return null
  return <SocialButton key={k} preset={k} link={link} style={{ marginTop: spacing.small }} />
}

type SpeakerBioProps = { speaker: Speaker; last?: boolean }

export function SpeakerBio(props: SpeakerBioProps) {
  const {
    name,
    facebook,
    twitter,
    github,
    medium,
    instagram,
    dribbble,
    websites,
    bio,
  } = props.speaker
  const { last = true } = props

  const splitName = name.split(" ")
  const key = `${splitName.join("-")}-bio`
  const links = {
    facebook,
    twitter,
    github,
    medium,
    instagram,
    dribbble,
    websites: websites || ([] as string[]),
  }
  const widthStyles = {
    maxWidth: getScreenWidth() - 2 * spacing.large,
  }
  const displaySocial =
    facebook ||
    twitter ||
    github ||
    medium ||
    instagram ||
    dribbble ||
    (websites && websites.length > 0)
  const socialStyles = [{ ...SOCIAL_WRAPPER, ...widthStyles }, last && SOCIAL_WRAPPER_LAST]
  const lastIndex = splitName.length - 1
  const firstName = splitName.slice(0, lastIndex).join(" ")

  const linkKeys = (Object.keys(links) as SocialButtonPresetNames[]).filter((k) => links[k])

  return (
    <View key={key} style={{ ...ROOT, ...{ width: 0.9 * getScreenWidth() } }}>
      <Text
        text={`${bio ? "ABOUT" : "FOLLOW"} ${firstName.toUpperCase()}`}
        preset="sectionHeader"
        style={{ color: palette.shamrock }}
      />
      {bio && <Text text={bio} preset="subheader" style={BIO} />}
      {displaySocial ? (
        <View style={socialStyles}>
          {linkKeys.map((k) =>
            k === "websites" ? (
              links.websites.map((link) => <RenderLink key={link} k="website" link={link} />)
            ) : (
              <RenderLink key={links[k]} k={k} link={links[k]} />
            ),
          )}
        </View>
      ) : null}
    </View>
  )
}
