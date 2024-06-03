package com.felix.servers.service;

import java.util.Collection;

import com.felix.servers.model.Server;

public interface ServerService {
    Server create(Server server);
    Server ping(String ipAddress);
    Collection<Server> list(int limit);
    Server get(Long id);
    Server update(Server server);
    Boolean delete(Long id);
}


// try {
//     address = InetAddress.getByName(ipAddress);
// } catch (UnknownHostException e) {
//     e.printStackTrace();
// }
// try {
//     address = InetAddress.getByName(ipAddress);
//     server.setStatus(address.isReachable(10000) ? Status.SERVER_UP : Status.SERVER_DOWN);
// } catch (IOException e) {
//     e.printStackTrace();
// }