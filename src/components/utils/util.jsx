export const Timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
