import { Box, Spinner } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { Navigate } from "react-router-dom";

import { routes } from "~constants/routes";

interface LetterViewerProps {
	htmlLetter: string | undefined;
	isLoading: boolean;
}

export const LetterViewer = ({
	htmlLetter,
	isLoading,
}: LetterViewerProps): JSX.Element => {
	if (isLoading) {
		return <Spinner />;
	}

	if (!htmlLetter) {
		return <Navigate to={`/${routes.public.index}/${routes.public.error}`} />;
	}

	return (
		<>
			{isLoading || !htmlLetter ? (
				<Spinner />
			) : (
				<Box border="1px" borderColor="grey.200" p={8} bg="white">
					<Editor
						disabled={true}
						initialValue={htmlLetter}
						init={{
							inline: true,
						}}
					/>
				</Box>
			)}
		</>
	);
};
