const AdminPage = () => {
	console.log(import.meta.env.VITE_ADMIN_URL);
	return (
		<section className="sticky top-0 bottom-0 w-full h-full">
			<iframe
				title="admin"
				src={`http://localhost:2055/admin`}
				width="100%"
				height="100%"
				allowFullScreen
			></iframe>
		</section>
	);
};

export default AdminPage;
