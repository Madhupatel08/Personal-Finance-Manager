package com.adobe.prj.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ResourceBundle;

public class DbUtil {
	private static String DRIVER = "";
	private static String URL = "";
	private static String USERNAME = "";
	private static String PASSWORD = "";
	
	static {
		ResourceBundle res = ResourceBundle.getBundle("database");
		DRIVER = res.getString("DRIVER");
		URL = res.getString("URL");
		USERNAME = res.getString("USERNAME");
		PASSWORD = res.getString("PASSWORD");
	
		try {
			Class.forName(DRIVER);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	public static Connection getConnection() throws SQLException {
		return DriverManager.getConnection(URL, USERNAME, PASSWORD);
	}
	
	public static void closeConnection(Connection con)  {
		try {
			if(con != null) {
				con.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}