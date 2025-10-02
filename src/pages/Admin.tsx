import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      const [ordersRes, categoriesRes] = await Promise.all([
        supabase
          .from("orders")
          .select(`
            *,
            order_items (*),
            profiles (full_name)
          `)
          .order("created_at", { ascending: false }),
        supabase.from("categories").select("*"),
      ]);

      if (ordersRes.error) throw ordersRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setOrders(ordersRes.data || []);
      setCategories(categoriesRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(productPrice);
    const stock = parseInt(productStock);

    if (isNaN(price) || isNaN(stock)) {
      toast.error("Giá và số lượng phải là số");
      return;
    }

    try {
      const slug = productName.toLowerCase().replace(/\s+/g, "-");

      const { error } = await supabase.from("products").insert([
        {
          name: productName,
          slug,
          price,
          stock,
          category_id: productCategory || null,
          description: productDescription || null,
        },
      ]);

      if (error) throw error;

      toast.success("Đã thêm sản phẩm");
      setProductName("");
      setProductPrice("");
      setProductStock("");
      setProductCategory("");
      setProductDescription("");
    } catch (error) {
      toast.error("Lỗi khi thêm sản phẩm");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      toast.success("Đã cập nhật trạng thái đơn hàng");
      fetchData();
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Quản trị</h1>

          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
              <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Đơn #{order.id.slice(0, 8)}</span>
                      <Select
                        value={order.status}
                        onValueChange={(value: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Chờ xác nhận</SelectItem>
                          <SelectItem value="processing">Đang xử lý</SelectItem>
                          <SelectItem value="shipped">Đang giao</SelectItem>
                          <SelectItem value="delivered">Đã giao</SelectItem>
                          <SelectItem value="cancelled">Đã hủy</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Khách hàng: {order.profiles?.full_name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Địa chỉ: {order.shipping_address}
                    </p>
                    <div className="space-y-2">
                      {order.order_items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.product_name} x{item.quantity}
                          </span>
                          <span>{item.subtotal.toLocaleString("vi-VN")}đ</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Tổng:</span>
                        <span>{order.total_amount.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Thêm sản phẩm mới</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Tên sản phẩm</Label>
                      <Input
                        id="name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Giá</Label>
                        <Input
                          id="price"
                          type="number"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="stock">Số lượng</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={productStock}
                          onChange={(e) => setProductStock(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Danh mục</Label>
                      <Select value={productCategory} onValueChange={setProductCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea
                        id="description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button type="submit">Thêm sản phẩm</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
