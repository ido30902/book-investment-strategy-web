interface Window {
	adsbygoogle: {
		push: (params: {}) => void;
		forEach: (
			callback: (ad: { push: (params: {}) => void }) => void
		) => void;
	}[];
}
