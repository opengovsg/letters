import { Card, CardHeader, Flex, Heading, Image, Text } from "@chakra-ui/react";

type TemplateCardProps = {
	name: string;
	updatedAt: string;
	thumbnailS3Path: string;
};

export const TemplateCard = (templateCardProps: TemplateCardProps) => {
	return (
		<Card padding={5} width={240} height={330}>
			<Flex justifyContent="center">
				<Image src="./template.png" width={170} height={170} />
			</Flex>
			<CardHeader>
				<Heading size="20px">{templateCardProps.name}</Heading>
				<Text fontSize="xs">Edited on {templateCardProps.updatedAt}</Text>
			</CardHeader>
		</Card>
	);
};
