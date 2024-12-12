import React, {useCallback} from 'react';
import {Alert, Button, Linking, View} from 'react-native';

export type LinkType = 'reference' | 'custom'

export type LinkTypeProps = {
  type?: LinkType
  newTab?: boolean
  reference?: any
  url?: string
  label?: string
  appearance?: 'default' | 'primary' | 'secondary'
  children?: React.ReactNode
  fullWidth?: boolean
  mobileFullWidth?: boolean
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  buttonProps?: any
}

type GenerateSlugType = {
  type?: LinkType
  url?: string
  reference?: any
}
const generateHref = (args: GenerateSlugType): string => {
  const {reference, url, type} = args;

  if((type === 'custom' || type === undefined) && url) {
    return url;
  }

  if(type === 'reference' && reference?.value && typeof reference.value !== 'string') {

    return `/${reference.relationTo}/${reference.value.slug}`;
  }

  return '';
};

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if(supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress}/>;
};

 const Link = ({
                          type,
                          url,
                          reference,
                          label,
                          children,
                          className,
                        }: LinkTypeProps) => {
  let href = generateHref({type, url, reference});

  if(!href) {
    return (
      <View className={className}>
        {label}
        {children}
      </View>
    );
  }

  return (
    <OpenURLButton url={url}>
      {label && label}
      {/*{children && children}*/}
    </OpenURLButton>
  );
};
 export default Link