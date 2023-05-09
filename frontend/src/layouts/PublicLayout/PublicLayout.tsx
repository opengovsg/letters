import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";

import { AppFooter } from "~/app/AppFooter";
import { routes } from "~constants/routes";
// import LogoSvg from '~/assets/Logo.svg'

export const PublicLayout = () => {
	// const editorRef = useRef(null);
	// const log = () => {
	//   if (editorRef.current) {
	//     console.log;
	//   }
	// };

	const html = `<p><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://file.go.gov.sg/pub-wwd-2023.png" width="377" height="379"></span></p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183); font-size: 24px;">Certificate of&nbsp;</span></p>
<p style="text-align: center;"><span style="font-size: 40px;"><strong><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Appreciation</span></strong></span></p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">presented to</span></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><strong><span style="color: rgb(48, 113, 183); font-size: 20px;">Nicholas Ong</span></strong></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">for supporting</span></p>
<p style="text-align: center;"><span style="font-size: 20px;"><strong><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Singapore World Water Day 2023</span></strong></span></p>
<p style="text-align: center;"><span style="text-decoration: underline;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183); text-decoration: underline;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://file.go.gov.sg/pub-wwd-2023-signature.png" width="170" height="115"></span></span></p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Cindy Keng</span></p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);">Director, 3P Network</span></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><span style="font-family: 'trebuchet ms', geneva, sans-serif; color: rgb(48, 113, 183);"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://file.go.gov.sg/pub-wwd-2023-footer.png" width="832" height="20"></span></p>
<script>alert("hello")</script>`;

	return (
		<VStack minWidth="100%" align="stretch" spacing={0}>
			<Flex
				position="static"
				pos="relative"
				flexDir="row"
				px={6}
				py={2}
				justifyContent="space-between"
				borderBottom="1px"
				borderBottomColor="base.divider.medium"
				w="full"
				align="center"
			>
				<RouterLink to={routes.index}>Letters</RouterLink>

				{/* <Image maxW="8rem" src={LogoSvg} /> */}
			</Flex>

			{/** @ts-expect-error align for box */}
			<Box minH="admin-content-min-height" w="full" align="center">
				{/*<Outlet />*/}
				<div dangerouslySetInnerHTML={{ __html: html }}></div>
			</Box>
			<AppFooter />
		</VStack>
	);
};
